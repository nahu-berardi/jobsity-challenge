
import React from 'react';
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { LocationOn } from '@material-ui/icons';
import parse from 'autosuggest-highlight/parse';
import { throttle } from 'lodash';


const autocompleteService = { current: null };
const placesService = { current: null };

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

export function InputGooglePlaces(props) {
    const { location, latlng } = props;

    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [latitude, setLatitude] = React.useState(undefined);
    const [longitude, setLongitude] = React.useState(undefined);

    const fetchPredictions = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetchPredictions({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    React.useEffect(() => {
        if (value) {
            location(typeof value === "string" ? value : value.description);

            if (!placesService.current && window.google) {
                placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
            }
            if (!placesService.current) {
                return undefined;
            }

            const request = {
                placeId: value.place_id,
                fields: ["geometry.location"],
            };

            placesService.current.getDetails(request, function (place, status) {
                if (status === 'OK') {
                    setLatitude(place.geometry.location.lat());
                    setLongitude(place.geometry.location.lng());
                }
            })
        }
    }, [value]);

    React.useEffect(() => {
        if (latitude && longitude) {
            latlng({ lat: latitude, lng: longitude });
        }
    }, [latitude, longitude]);

    return (
        <Autocomplete
            style={{ width: 300 }}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            options={options}
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Location"
                    variant="outlined"
                    fullWidth
                />
            )}
            renderOption={(option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOn className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}