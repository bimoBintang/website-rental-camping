import ProdukSectionAll from "@/components/ProdukSectionAll";
import { getProduct } from "../actions/product";


export default async function ProdukPage() {
    const produk = await getProduct();
    return (
        <>
            <ProdukSectionAll produk={produk}/>
        </>
    )
}