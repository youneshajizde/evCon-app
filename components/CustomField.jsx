import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomField({ name, label, placeHolder, control, fieldType }) {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl className="rounded-xl border-gray-300 placeholder:text-gray-400">
            {fieldType === "input" ? (
              <Input placeholder={placeHolder} {...field} />
            ) : fieldType === "textarea" ? (
              <Textarea placeholder={placeHolder} {...field} />
            ) : fieldType === "datepicker" ? (
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  field.onChange(date);
                }}
                placeholderText={placeHolder}
                className="w-full rounded-xl border-gray-300 border-[1px] py-[0.5rem] px-2"
              />
            ) : null}
          </FormControl>
          <FormMessage className="text-sm text-red-600 font-thin" />
        </FormItem>
      )}
    />
  );
}

export default CustomField;
