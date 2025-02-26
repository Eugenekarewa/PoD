// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DeliveryStorage.sol";

contract PaymentIssuer {
    DeliveryStorage public deliveryStorage;

    constructor(address _deliveryStorageAddress) {
        deliveryStorage = DeliveryStorage(_deliveryStorageAddress);
    }

    function issuePayment(uint256 _trackingId) external {
        // Fetch delivery data using getDelivery()
        DeliveryStorage.Delivery memory delivery = deliveryStorage.getDelivery(_trackingId);

        require(delivery.isVerified, "Delivery not verified");
        require(!delivery.isPaid, "Payment already issued");

        // Call markPaid to update isPaid status
        deliveryStorage.markPaid(_trackingId);
    }
}
