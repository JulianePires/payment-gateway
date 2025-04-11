package handlers

import (
	"encoding/json"
	"errors"
	"github.com/devfullcycle/imersao22/go-gateway/internal/domain"
	"github.com/devfullcycle/imersao22/go-gateway/internal/dto"
	"github.com/devfullcycle/imersao22/go-gateway/internal/service"
	"github.com/go-chi/chi"
	"net/http"
)

type InvoiceHandler struct {
	invoiceService *service.InvoiceService
}

func NewInvoiceHandler(invoiceService *service.InvoiceService) *InvoiceHandler {
	return &InvoiceHandler{
		invoiceService: invoiceService,
	}
}

// Create Requer autenticação via header X-API-Key
// Endpoint: /invoice
// Method: POST
// Description: Cria uma nova fatura
// Request Body: CreateInvoiceInput
// Response: InvoiceOutput
func (h *InvoiceHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input dto.CreateInvoiceInput
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	input.APIKey = r.Header.Get("X-API-Key")
	if input.APIKey == "" {
		http.Error(w, "Missing API key", http.StatusUnauthorized)
		return
	}

	output, err := h.invoiceService.Create(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(output)
}

// GetByID Requer autenticação via header X-API-Key
// Endpoint: /invoice/{id}
// Method: GET
// Description: Busca uma fatura pelo ID
// Request: ID da fatura na URL
// Response: InvoiceOutput
func (h *InvoiceHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "Missing invoice ID", http.StatusBadRequest)
		return
	}

	apiKey := r.Header.Get("X-API-Key")
	if apiKey == "" {
		http.Error(w, "Missing API key", http.StatusUnauthorized)
		return
	}

	output, err := h.invoiceService.GetByID(id, apiKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		switch {
		case errors.Is(err, domain.ErrInvoiceNotFound):
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		case errors.Is(err, domain.ErrAccountNotFound):
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		case errors.Is(err, domain.ErrUnauthorizedAccess):
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		default:
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output)
}

// ListByAccount Requer autenticação via header X-API-Key
// Endpoint: /invoice
// Method: GET
// Description: Lista todas as faturas da conta
// Request: Nenhum
// Response: Lista de InvoiceOutput
func (h *InvoiceHandler) ListByAccount(w http.ResponseWriter, r *http.Request) {
	apiKey := r.Header.Get("X-API-Key")
	if apiKey == "" {
		http.Error(w, "Missing API key", http.StatusUnauthorized)
		return
	}

	output, err := h.invoiceService.ListByAccountAPIKey(apiKey)
	if err != nil {
		switch {
		case errors.Is(err, domain.ErrAccountNotFound):
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		default:
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output)
}
