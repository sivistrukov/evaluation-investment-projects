import React, {useState, useEffect} from 'react';
import CustomInput from "../../ui/CustomInput";
import ProductVolumeTable from "./ProductVolumeTable";
import Gap from "../../ui/Gap";
import ProductDemandTable from "./ProductDemandTable";

function Product({period, product, callback}) {
    const [productName, setProductName] = useState("")
    const [productVolume, setProductVolume] = useState({
        years: [],
        summaryNatural: 0,
        summaryCost: 0,
    })
    const [productDemand, setProductDemand] = useState({
        years: []
    })

    const getProductVolumeTable = (data) => {
        setProductVolume(data)
    }
    const getProductDemandTable = (data) => {
        setProductDemand(data)
    }

    useEffect(() => {
        callback && callback(product.index, {
            volume: productVolume,
            demand: productDemand,
            name: productName,
            index: product.index
        })
    }, [productName, productVolume, productDemand])

    return (
        <div>
            <CustomInput
                fullWidth='100%'
                label={`Наименование продукции ${product.index + 1}:`}
                type="text"
                name="productName"
                onChange={(e) => setProductName(e.target.value)}
            />
            <Gap gap={20}/>
            <ProductVolumeTable period={period} callback={getProductVolumeTable}/>
            <Gap gap={20}/>
            <ProductDemandTable period={period} callback={getProductDemandTable}/>
        </div>
    );
}

export default React.memo(Product);