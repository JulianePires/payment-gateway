package domain

import "errors"

var (
	// ErrAccountNotFound retornado quando uma conta não é encontrada
	ErrAccountNotFound = errors.New("account not found")
	// ErrDuplicatedAPIKey retornado quando já existe uma conta com a mesma api key
	ErrDuplicatedAPIKey = errors.New("duplicated API key")
	// ErrInvoiceNotFound retornado quando a fatura não é encontrada
	ErrInvoiceNotFound = errors.New("invoice not found")
	// ErrUnauthorizedAccess retornado quando há tentativa de acesso não autorizado
	ErrUnauthorizedAccess = errors.New("unauthorized access")

	// ErrInvalidAmount retornado quando o valor da transação é inválido
	ErrInvalidAmount = errors.New("amount must be greater than 0")
	// ErrInvalidStatus retornado quando o status da transação é inválido
	ErrInvalidStatus = errors.New("invalid status")
)
