package server

import (
	"github.com/devfullcycle/imersao22/go-gateway/internal/service"
	"github.com/devfullcycle/imersao22/go-gateway/internal/web/handlers"
	"github.com/devfullcycle/imersao22/go-gateway/internal/web/middleware"
	"github.com/go-chi/chi"
	"github.com/rs/cors"
	"net/http"
)

type Server struct {
	router         *chi.Mux
	server         *http.Server
	accountService *service.AccountService
	invoiceService *service.InvoiceService
	port           string
}

func NewServer(accountService *service.AccountService, invoiceService *service.InvoiceService, port string) *Server {
	router := chi.NewRouter()
	return &Server{
		router:         router,
		accountService: accountService,
		invoiceService: invoiceService,
		port:           port,
	}
}

func (s *Server) ConfigureRoutes() {
	accountHandler := handlers.NewAccountHandler(s.accountService)
	invoiceHandler := handlers.NewInvoiceHandler(s.invoiceService)
	authMiddleware := middleware.NewAuthMiddleware(s.accountService)

	s.router.Post("/accounts", accountHandler.Create)
	s.router.Get("/accounts", accountHandler.Get)

	s.router.Group(func(r chi.Router) {
		r.Use(authMiddleware.Authenticate)
		s.router.Post("/invoice", invoiceHandler.Create)
		s.router.Get("/invoice/{id}", invoiceHandler.GetByID)
		s.router.Get("/invoice", invoiceHandler.ListByAccount)
	})
}

func (s *Server) ConfigureCors() http.Handler {
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Replace with your allowed origins
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "X-API-Key"},
		AllowCredentials: true,
	})

	return corsHandler.Handler(s.router)
}

func (s *Server) Start() error {
	handler := s.ConfigureCors()
	s.server = &http.Server{
		Addr:    ":" + s.port,
		Handler: handler,
	}

	s.ConfigureRoutes()

	return s.server.ListenAndServe()
}
