
document.addEventListener("DOMContentLoaded", function () {

    // Initialize the Bootstrap toast
    const toastElement = document.getElementById("cartToast");

    const cartToast = bootstrap.Toast.getOrCreateInstance(
        toastElement,
        { delay: 3000 }
    );

    // Add to Cart functionality
    window.addToCart = function () {
        cartToast.show();
    };

    // Confirm Order functionality
    window.confirmOrder = function () {
        alert("Order confirmation successful! Thank you for shopping with TechNova.");

        const modalElement = document.getElementById("buyNowModal");

        const buyNowModal =
            bootstrap.Modal.getOrCreateInstance(modalElement);

        buyNowModal.hide();
    };

});
