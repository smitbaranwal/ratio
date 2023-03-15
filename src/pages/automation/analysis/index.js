import Card from '@mui/material/Card'

const Analysis = () => {
    const imageStyle = {
        width: "100%",
        position:'absolute',
        top:'-145px'
       }

    return (
        <Card sx={{
            width:"100%", height:"100%", position:"relative"
        }}>
            <img style={imageStyle} src="/images/feature_underprogress.png" alt="" />
        </Card>
    )
}

export default Analysis