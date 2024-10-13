'use client';

import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { localityArray } from '@/helpers/locality';
import { Input } from '@/components/ui/input';
import { UseFormSetValue } from 'react-hook-form';
import { HouseAddressSchemaType } from '@/schemas/new-home-schema';

interface SelectLocalityProps {
    setValue: UseFormSetValue<HouseAddressSchemaType>
  }

export const SelectLocality = ({ setValue }:SelectLocalityProps) => {
    const [selectedZipCode, setSelectedZipCode] = useState<string>('');

    const handleSelectChange = (value: string) => {
        const selectedLocality = localityArray.find(locality => locality.value === value);
        if (selectedLocality) {
            setSelectedZipCode(selectedLocality.ZipCode);
            setValue('locality', selectedLocality.name.toString(), { shouldValidate: true})
            setValue('zipCode', selectedLocality.ZipCode.toString(), { shouldValidate: true})
        }
    };
    return (
        <div className='flex gap-2 mb-4'>
            <Select onValueChange={handleSelectChange}>
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
        <Input className='w-100' readOnly placeholder='Código postal' value={selectedZipCode} />
        </div>
    )
}
