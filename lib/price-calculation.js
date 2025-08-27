export default function priceCalculation(data) {
    if (data?.length > 0) {
        let total = 0;
        data?.forEach((item) => {
            total += item.price * item.qty;
        });

        return total;
    }
    return 0;
}
