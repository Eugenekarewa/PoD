// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeliveryStorage {
    struct Delivery {
        string nametag;
        string pickupStation;
        uint256 amount;
        string recipientName;
        string senderName;
        string recipientPhone;
        string senderPhone;
        bool isVerified;
        bool isPaid;
    }

    mapping(uint256 => Delivery) public deliveries;
    uint256 public nextTrackingId;

    event DeliveryCreated(uint256 indexed trackingId, string nametag, string pickupStation);
    event DeliveryVerified(uint256 indexed trackingId);
    event PaymentIssued(uint256 indexed trackingId);

    function createDelivery(
        string calldata _nametag,
        string calldata _pickupStation,
        uint256 _amount,
        string calldata _recipientName,
        string calldata _senderName,
        string calldata _recipientPhone,
        string calldata _senderPhone
    ) external {
        uint256 trackingId = nextTrackingId++;
        deliveries[trackingId] = Delivery({
            nametag: _nametag,
            pickupStation: _pickupStation,
            amount: _amount,
            recipientName: _recipientName,
            senderName: _senderName,
            recipientPhone: _recipientPhone,
            senderPhone: _senderPhone,
            isVerified: false,
            isPaid: false
        });

        emit DeliveryCreated(trackingId, _nametag, _pickupStation);
    }

    function getDelivery(uint256 _trackingId) external view returns (Delivery memory) {
        require(_trackingId < nextTrackingId, "Invalid tracking ID");
        return deliveries[_trackingId];
    }

    function markVerified(uint256 _trackingId) external {
        require(_trackingId < nextTrackingId, "Invalid tracking ID");
        require(!deliveries[_trackingId].isVerified, "Already verified");

        deliveries[_trackingId].isVerified = true;

        emit DeliveryVerified(_trackingId);
    }

    function markPaid(uint256 _trackingId) external {
        require(_trackingId < nextTrackingId, "Invalid tracking ID");
        require(deliveries[_trackingId].isVerified, "Delivery not verified");
        require(!deliveries[_trackingId].isPaid, "Payment already issued");

        deliveries[_trackingId].isPaid = true;

        emit PaymentIssued(_trackingId);
    }
}
