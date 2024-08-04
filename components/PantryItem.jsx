import {Box, Button, Stack, Typography} from "@mui/material";

const PantryItem = ({ name, quantity, addItem, removeItem }) => {
    return (
        <Box
            key={name}
            width="100%"
            minHeight="150px"
            display="flex"
            alignItems="center"
            bgcolor="#f0f0f0"
            padding={5}
        >
            <Typography variant="h3" color="#333" textAlign="center" flex={1}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h3" color="#333" textAlign="center" flex={1}>
                {quantity}
            </Typography>
            <Stack direction="row" spacing={2} flex={1} justifyContent="center">
                <Button variant="contained" onClick={() => addItem(name)}>
                    Add
                </Button>
                <Button variant="contained" onClick={() => removeItem(name)}>
                    Remove
                </Button>
            </Stack>
        </Box>
    )
}

export default PantryItem;