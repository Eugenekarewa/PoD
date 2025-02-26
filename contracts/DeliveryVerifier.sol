// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DeliveryStorage.sol";

contract DeliveryVerifier {
    DeliveryStorage public deliveryStorage;

    constructor(address _deliveryStorageAddress) {
        deliveryStorage = DeliveryStorage(_deliveryStorageAddress);
    }

    function verifyDelivery(uint256 _trackingId) external {
        // Fetch delivery data using getDelivery()
        DeliveryStorage.Delivery memory delivery = deliveryStorage.getDelivery(_trackingId);

        require(!delivery.isVerified, "Delivery already verified");

        // Since we cannot modify the struct inside another contract,
        // we need a function in DeliveryStorage to update `isVerified`
        deliveryStorage.markVerified(_trackingId);
    }
}
