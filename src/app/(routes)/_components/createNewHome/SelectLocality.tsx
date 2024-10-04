import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { localityArray } from '@/helpers/locality';

export const SelectLocality = () => {
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una localidad o comuna" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {localityArray.map((locality) => (
                        <SelectItem value={locality.value} key={locality.id}>{locality.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
