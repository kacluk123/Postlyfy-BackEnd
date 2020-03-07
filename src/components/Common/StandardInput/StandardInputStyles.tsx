import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'

export const StandardInput = styled(TextField).attrs({
    className: 'StandardInput'
})`
    && {
        width: 100%;
        input {
            color: var(--dark)
        }
        
        color: var(--tiny-grey);

        label {
            color: var(--tiny-grey);
        }

    
        .Mui-focused .MuiOutlinedInput-notchedOutline {
                border: 2px solid var(--tiny-grey); 
        }
     
    }
`

export const StandardInputContainer = styled.div.attrs({
    className: 'StandardInputContainer'
})`
    display: grid;
    grid-row-gap: 10px;
`

export const StandardInputErrorMessage = styled.div.attrs({
    className: 'StandardInputErrorMessage'
})`
    color: var(--red-orange)
`