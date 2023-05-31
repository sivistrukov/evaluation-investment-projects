import React from "react"
import Gap from "../../ui/Gap"
import WorkPlacesTable from "./WorkPlacesTable"

const WorkPlaces = ({period, callback=()=>{}}) =>{
    return(
        <div>
            <label>Количество создаваемых высокопроизводительных рабочих мест (с разбивкой по годам):</label>
            <Gap/>
            <WorkPlacesTable period={period} callback={callback}/>
        </div>
    )
}
export default React.memo(WorkPlaces)