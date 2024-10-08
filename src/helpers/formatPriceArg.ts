export function formatPriceARS(price: number | null | undefined): string {
    if (price === null || price === undefined) {
        return 'Precio no disponible';
    }

    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}