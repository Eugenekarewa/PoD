// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DeliveryStorage.sol";

contract DeliveryTracker {
    DeliveryStorage public deliveryStorage;

    constructor(address _deliveryStorageAddress) {
        deliveryStorage = DeliveryStorage(_deliveryStorageAddress);
    }

    function trackDelivery(uint256 _trackingId) external view returns (
        string memory nametag,
        string memory pickupStation,
        uint256 amount,
        string memory recipientName,
        string memory senderName,
        string memory recipientPhone,
        string memory senderPhone,
        bool isVerified,
        bool isPaid
    ) {
        // Fetch the delivery from the DeliveryStorage contract
        DeliveryStorage.Delivery memory delivery = deliveryStorage.getDelivery(_trackingId);

        // Return the delivery details
        return (
            delivery.nametag,
            delivery.pickupStation,
            delivery.amount,
            delivery.recipientName,
            delivery.senderName,
            delivery.recipientPhone,
            delivery.senderPhone,
            delivery.isVerified,
            delivery.isPaid
        );
    }
}