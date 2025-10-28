/* Praticando o uso de um date picker. */

import { useState } from 'react'
import { View, Text } from 'react-native'
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker'
import type { DateType } from 'react-native-ui-datepicker'



export default function UIDatePicker() {
    const estiloPadrao = useDefaultStyles()
    const [ selecionada, setSelecionada ] = useState<DateType>(new Date())

    return (
        <View style={{ backgroundColor: "darkblue", padding: 10 }}>
            <DateTimePicker
                mode="single"
                date={selecionada}
                onChange={ ({date}) => setSelecionada(date) }
                styles={{...estiloPadrao, day_label: { color: 'white' }}}
            />

            <Text style={{ color: 'white' }}>A data selecionada é {selecionada!.toLocaleString()}</Text>
        </View>
    )
}