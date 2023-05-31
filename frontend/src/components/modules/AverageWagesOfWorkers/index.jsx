import React from "react"
import Gap from "../../ui/Gap"
import AverageWagesOfWorkersTable from "./AverageWagesOfWorkersTable"

const AverageWagesOfWorkers = ({period, callback=()=>{}}) =>{
    return(
        <div>
            <label>Средняя заработная плата работников заемщика за каждый год прогнозного периода реализации инвестиционного проекта:</label>
            <Gap/>
            <AverageWagesOfWorkersTable period={period} callback={callback}/>
        </div>
    )
}
export default React.memo(AverageWagesOfWorkers)