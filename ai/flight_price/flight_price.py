#!/usr/bin/env python

from email.policy import default
import os
import click
import pickle
import pandas as pd
import numpy as np

model = pickle.load(
    open(os.path.join(os.path.dirname(__file__), "flight_price.pkl"), "rb"))


@click.command()
@click.option("-dep", "--dep_date_time", type=str, help="Departure Date Time")
@click.option("-arr", "--arr_date_time", type=str, help="Arrival Date Time")
@click.option("-st", "--stops", type=int, help="Stops Count")
@click.option("-a", "--airline", type=str, help="Airline Name")
@click.option("-s", "--source", type=str, help="Source Airport")
@click.option("-d", "--destination", type=str, help="Destination Airport")
@click.option("--debug", "debug", is_flag=True, help="Destination Airport", default=False)
def predict(dep_date_time, arr_date_time, stops, airline, source, destination, debug=False):
    # Date_of_Journey
    Journey_day = int(pd.to_datetime(
        dep_date_time, format="%Y-%m-%dT%H:%M").day)
    Journey_month = int(pd.to_datetime(
        dep_date_time, format="%Y-%m-%dT%H:%M").month)
    if (debug):
        print("Journey Date : ", Journey_day, Journey_month)

    # Departure
    Dep_hour = int(pd.to_datetime(dep_date_time, format="%Y-%m-%dT%H:%M").hour)
    Dep_min = int(pd.to_datetime(
        dep_date_time, format="%Y-%m-%dT%H:%M").minute)
    if (debug):
        print("Departure : ", Dep_hour, Dep_min)

    # Arrival
    Arrival_hour = int(pd.to_datetime(
        arr_date_time, format="%Y-%m-%dT%H:%M").hour)
    Arrival_min = int(pd.to_datetime(
        arr_date_time, format="%Y-%m-%dT%H:%M").minute)
    if (debug):
        print("Arrival : ", Arrival_hour, Arrival_min)

    # Duration
    dur_hour = abs(Arrival_hour - Dep_hour)
    dur_min = abs(Arrival_min - Dep_min)
    if (debug):
        print("Duration : ", dur_hour, dur_min)

    # Airline
    # AIR ASIA = 0 (not in column)
    Jet_Airways = int(airline == 'Jet Airways')
    IndiGo = int(airline == 'IndiGo')
    Air_India = int(airline == 'Air India')
    Multiple_carriers = int(airline == 'Multiple carriers')
    SpiceJet = int(airline == 'SpiceJet')
    Vistara = int(airline == 'Vistara')
    GoAir = int(airline == 'GoAir')
    Multiple_carriers_Premium_economy = int(
        airline == 'Multiple carriers Premium economy')
    Jet_Airways_Business = int(airline == 'Jet Airways Business')
    Vistara_Premium_economy = int(airline == 'Vistara Premium economy')
    Trujet = int(airline == 'Trujet')

    if (debug):
        print("Airline : ", Jet_Airways, IndiGo, Air_India, Multiple_carriers,
              SpiceJet, Vistara, GoAir, Multiple_carriers_Premium_economy, Jet_Airways_Business, Vistara_Premium_economy, Trujet)

    # Source
    # Banglore = 0 (not in column)
    s_Delhi = int(source == 'Delhi')
    s_Kolkata = int(source == 'Kolkata')
    s_Mumbai = int(source == 'Mumbai')
    s_Chennai = int(source == 'Chennai')
    if (debug):
        print("Source : ", s_Delhi, s_Kolkata, s_Mumbai, s_Chennai)

    # Destination
    # Banglore = 0 (not in column)
    d_Cochin = int(destination == 'Cochin')
    d_Delhi = int(destination == 'Delhi')
    d_New_Delhi = int(destination == 'New_Delhi')
    d_Hyderabad = int(destination == 'Hyderabad')
    d_Kolkata = int(destination == 'Kolkata')
    if (debug):
        print("Destination : ", d_Cochin, d_Delhi,
              d_New_Delhi, d_Hyderabad, d_Kolkata)

    array = np.array([[
        stops,
        Journey_day,
        Journey_month,
        Dep_hour,
        Dep_min,
        Arrival_hour,
        Arrival_min,
        dur_hour,
        dur_min,
        Air_India,
        GoAir,
        IndiGo,
        Jet_Airways,
        Jet_Airways_Business,
        Multiple_carriers,
        Multiple_carriers_Premium_economy,
        SpiceJet,
        Trujet,
        Vistara,
        Vistara_Premium_economy,
        s_Chennai,
        s_Delhi,
        s_Kolkata,
        s_Mumbai,
        d_Cochin,
        d_Delhi,
        d_Hyderabad,
        d_Kolkata,
        d_New_Delhi
    ]])

    column_values = [
        'Total_Stops',
        'Journey_day',
        'Journey_month',
        'Dep_hour',
        'Dep_min',
        'Arrival_hour',
        'Arrival_min',
        'Duration_hours',
        'Duration_mins',
        'Airline_Air India',
        'Airline_GoAir',
        'Airline_IndiGo',
        'Airline_Jet Airways',
        'Airline_Jet Airways Business',
        'Airline_Multiple carriers',
        'Airline_Multiple carriers Premium economy',
        'Airline_SpiceJet',
        'Airline_Trujet',
        'Airline_Vistara',
        'Airline_Vistara Premium economy',
        'Source_Chennai',
        'Source_Delhi',
        'Source_Kolkata',
        'Source_Mumbai',
        'Destination_Cochin',
        'Destination_Delhi',
        'Destination_Hyderabad',
        'Destination_Kolkata',
        'Destination_New Delhi'
    ]

    prediction = model.predict(pd.DataFrame(
        data=array,
        columns=column_values))

    output = round(prediction[0], 2)
    click.echo(output)
    return output


if __name__ == '__main__':
    predict()
