import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
} from "@mui/material";

type ValueITem = {
  name: string;
  value: number;
};

interface IDataDisplayProps {
  label?: string;
  values: ValueITem[];
  valuesCount?: number[];
  limit: number;
  limitChangeFunc: (value: number) => void;
}

export const DataDisplay = ({
  label = "Count",
  values,
  valuesCount,
  limit,
  limitChangeFunc,
}: IDataDisplayProps): JSX.Element => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      {values?.map(({ name, value }: ValueITem) => (
        <Typography key={name} noWrap>
          {name} {value}
        </Typography>
      ))}

      <FormControl sx={{ minWidth: "5rem" }} size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          value={limit}
          label={label}
          onChange={(e) => limitChangeFunc(Number(e.target.value))}
        >
          {!!valuesCount ? (
            valuesCount.map((item: number) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))
          ) : (
            <>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};
