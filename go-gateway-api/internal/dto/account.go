package dto

import (
	"github.com/devfullcycle/imersao22/go-gateway/internal/domain"
	"time"
)

// CreateAccountInput representa os dados de entrada para criar uma nova conta
type CreateAccountInput struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

// CreateAccountOutput representa os dados de saída após criar uma nova conta
type AccountOutput struct {
	ID       string    `json:"id"`
	Name     string    `json:"name"`
	Email    string    `json:"email"`
	Balance  float64   `json:"balance"`
	APIKey   string    `json:"api_key,omitempty"`
	CreateAt time.Time `json:"created_at"`
	UpdateAt time.Time `json:"updated_at"`
}

// ToAccount cria um objeto Account a partir dos dados de entrada CreateAccountInput
func ToAccount(input CreateAccountInput) *domain.Account {
	return domain.NewAccount(input.Name, input.Email)
}

// FromAccount converte um objeto Account para AccountOutput
func FromAccount(account *domain.Account) AccountOutput {
	return AccountOutput{
		ID:       account.ID,
		Name:     account.Name,
		Email:    account.Email,
		Balance:  account.Balance,
		APIKey:   account.APIKey,
		CreateAt: account.CreateAt,
		UpdateAt: account.UpdateAt,
	}
}
