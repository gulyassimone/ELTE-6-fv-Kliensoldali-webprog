import Typography from '@mui/material/Typography';


export function Layout(props) {
    return (
        <div className="ui container">
            <Typography variant="h3" component="h2">
                Scoring Component
            </Typography>
            {props.children}
        </div>
    )
        ;
}