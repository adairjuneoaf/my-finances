export const formatValueToMoney = (value: number) => {
    const money = new Intl.NumberFormat("pt-BR", {
        style: "currency", currency: "BRL",
    }).format(value)

    return money
}