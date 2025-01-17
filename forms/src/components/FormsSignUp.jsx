import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function FormSignUp({ handleSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        prom: false,
        nov: false,
    });

    const [errors, setErrors] = useState({
        name: { error: false, helperText: 'Deben ser al menos 3 caracteres' },
        lastName: { error: false, helperText: 'Deben ser al menos 3 caracteres' },
        email: { error: false, helperText: 'Debe ser un email válido' },
    });

    const validateField = (field, value) => {
        switch (field) {
            case 'name':
            case 'lastName':
                return value.length >= 3
                    ? { error: false, helperText: '' }
                    : { error: true, helperText: 'Deben ser al menos 3 caracteres' };
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value)
                    ? { error: false, helperText: '' }
                    : { error: true, helperText: 'Debe ser un email válido' };
            default:
                return { error: false, helperText: '' };
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
        }
    };

    const handleBlur = (field) => {
        setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <TextField
                id="name"
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                error={errors.name.error}
                helperText={errors.name.helperText}
            />
            <TextField
                id="lastName"
                label="Apellidos"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                onBlur={() => handleBlur('lastName')}
                error={errors.lastName.error}
                helperText={errors.lastName.helperText}
            />
            <TextField
                id="email"
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                error={errors.email.error}
                helperText={errors.email.helperText}
            />
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={formData.prom}
                            onChange={(e) => handleChange('prom', e.target.checked)}
                        />
                    }
                    label="Promociones"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={formData.nov}
                            onChange={(e) => handleChange('nov', e.target.checked)}
                        />
                    }
                    label="Novedades"
                />
            </FormGroup>
            <Button variant="contained" type="submit">
                Registrarse
            </Button>
        </form>
    );
}

export default FormSignUp;
