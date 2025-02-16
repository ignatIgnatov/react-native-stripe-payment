package com.example.stripe_payment;

public class PaymentRequest {
    private String amount;

    public PaymentRequest() {
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
