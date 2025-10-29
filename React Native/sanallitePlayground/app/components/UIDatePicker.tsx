/* Praticando o uso de um date picker. */

import { useState } from 'react'
import { View, Text } from 'react-native'
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker'
import type { DateType } from 'react-native-ui-datepicker'

export default function UIDatePicker() {
    const estiloPadrao = useDefaultStyles()
    const [ dataSelecionada, setSelecionada ] = useState<Date>(new Date())

    return (
        <View style={{ backgroundColor: "darkblue", padding: 16, width: '100%' }}>
            <DateTimePicker
                mode="single"
                locale='pt-br'
                timePicker={false}
                date={dataSelecionada}
                onChange={ ({date}) => {
                    console.log('tipo: ', typeof date)
                    console.log('é um objeto de data?', date instanceof Date)
                    console.log('valor:', date)

                    setSelecionada(date as Date)
                    /* Verificando o objeto do tipo DateType e o salvando como Date */
                } }
                styles={{...estiloPadrao, day_label: { color: 'white' }}}
                weekdaysFormat='short'
            />

            <Text style={{ color: 'white' }}>A data selecionada é {dataSelecionada.toLocaleDateString()}.</Text>
        </View>
    )
}