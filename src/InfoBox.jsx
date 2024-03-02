import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function InfoBox ({weatherInfo , ColorValue}) {
    const info = weatherInfo;
    const INIT_URL = "https://images.unsplash.com/photo-1628525805785-cc1d20e7be74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZHVzdHklMjB3ZWF0aGVyfGVufDB8fDB8fHww";

    const HOT_URL = "https://plus.unsplash.com/premium_photo-1667076649924-d784d205cbba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHN1bm55JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
    const COLD_URL = "https://images.unsplash.com/photo-1694033996901-60322b8740dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29sZCUyMHdlYXRoZXIlMjBjYXIlMjBkZWZlbmRlcnxlbnwwfHwwfHx8MA%3D%3D";
    const RAIN_URL = "https://images.unsplash.com/photo-1583054994298-cc68ddaca862?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhaW55JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";


    return (

        <div className="InfoBox" >
            <div className='cardContainer' >
                <br />
                <br />
                <Card sx={{ maxWidth: 345, backgroundColor:ColorValue.bgColor, color:ColorValue.fColor }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image = {
                            info.humidity> 80 ? RAIN_URL : info.temp > 14 ? HOT_URL : COLD_URL
                        }
                        title="green iguana"
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div" >
                            {info.city} &nbsp; {info.humidity> 80 ? <ThunderstormIcon/> : info.temp > 14 ? <WbSunnyIcon/> : <AcUnitIcon/>}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component={"span"} sx={{ color:ColorValue.fColor}}>
                            <p>
                                Temperature : {info.temp}&deg;C
                            </p>
                            <p>
                                Humidity : {info.humidity}
                            </p>  
                            <p>
                                Min Temperature : {info.tempMin}&deg;C
                            </p>
                            <p>
                                Max Temperature : {info.tempMax}&deg;C
                            </p>
                            <p>
                                The Weather can be described as <i>{info.weather}</i> and feels like : {info.feelsLike}&deg;C
                            </p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}