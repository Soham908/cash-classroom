import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const NoMatch = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    }

    return (
        <Container maxWidth="sm" className="mt-5">
            <div className="text-center text-danger font-weight-bold error404">
                <Typography variant="h4" color="error">404 NOT FOUND :(</Typography>
                <Button variant="contained" color="error" fullWidth onClick={handleGoBack}>Get back</Button>
            </div>
        </Container>
    );
}

export default NoMatch;