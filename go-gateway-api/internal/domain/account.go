package domain

import (
	"crypto/rand"
	"encoding/hex"
	"github.com/google/uuid"
	"sync"
	"time"
)

type Account struct {
	ID       string
	Name     string
	Email    string
	APIKey   string
	Balance  float64
	mu       sync.RWMutex
	CreateAt time.Time
	UpdateAt time.Time
}

func generateAPIKey() string {
	// Generate a random 16-byte API key
	b := make([]byte, 16)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}

func NewAccount(name, email string) *Account {
	account := &Account{
		ID:       uuid.New().String(),
		Name:     name,
		Email:    email,
		Balance:  0,
		APIKey:   generateAPIKey(),
		CreateAt: time.Now(),
		UpdateAt: time.Now(),
	}

	return account
}

func (a *Account) AddBalance(amount float64) {
	a.mu.Lock()
	defer a.mu.Unlock()
	a.Balance += amount
	a.UpdateAt = time.Now()
}
