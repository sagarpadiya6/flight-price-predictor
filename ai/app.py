import pickle
import pandas as pd

model = pickle.load(open("flight_rf.pkl", "rb"))


def predict():
    # Date_of_Journey
    date_dep = request.form["Dep_Time"]
    Journey_day = int(pd.to_datetime(
        date_dep, format="%Y-%m-%dT%H:%M").day)
    Journey_month = int(pd.to_datetime(
        date_dep, format="%Y-%m-%dT%H:%M").month)
    # print("Journey Date : ",Journey_day, Journey_month)

    # Departure
    Dep_hour = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").hour)
    Dep_min = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").minute)
    # print("Departure : ",Dep_hour, Dep_min)

    # Arrival
    date_arr = request.form["Arrival_Time"]
    Arrival_hour = int(pd.to_datetime(
        date_arr, format="%Y-%m-%dT%H:%M").hour)
    Arrival_min = int(pd.to_datetime(
        date_arr, format="%Y-%m-%dT%H:%M").minute)
    # print("Arrival : ", Arrival_hour, Arrival_min)

    # Duration
    dur_hour = abs(Arrival_hour - Dep_hour)
    dur_min = abs(Arrival_min - Dep_min)
    # print("Duration : ", dur_hour, dur_min)

    # Total Stops
    Total_stops = int(request.form["stops"])
    # print(Total_stops)

    # Airline
    # AIR ASIA = 0 (not in column)
    airline = request.form['airline']
    Jet_Airways = airline == 'Jet Airways'
    IndiGo = airline == 'IndiGo'
    Air_India = airline == 'Air India'
    Multiple_carriers = airline == 'Multiple carriers'
    SpiceJet = airline == 'SpiceJet'
    Vistara = airline == 'Vistara'
    GoAir = airline == 'GoAir'
    Multiple_carriers_Premium_economy = airline == 'Multiple carriers Premium economy'
    Jet_Airways_Business = airline == 'Jet Airways Business'
    Vistara_Premium_economy = airline == 'Vistara Premium economy'
    Trujet = airline == 'Trujet'

    # print(Jet_Airways,
    #     IndiGo,
    #     Air_India,
    #     Multiple_carriers,
    #     SpiceJet,
    #     Vistara,
    #     GoAir,
    #     Multiple_carriers_Premium_economy,
    #     Jet_Airways_Business,
    #     Vistara_Premium_economy,
    #     Trujet)

    # Source
    # Banglore = 0 (not in column)
    Source = request.form["Source"]
    s_Delhi = Source == 'Delhi'
    s_Kolkata = Source == 'Kolkata'
    s_Mumbai = Source == 'Mumbai'
    s_Chennai = Source == 'Chennai'

    # print(s_Delhi,
    #     s_Kolkata,
    #     s_Mumbai,
    #     s_Chennai)

    # Destination
    # Banglore = 0 (not in column)
    Source = request.form["Destination"]
    d_Cochin = Source == 'Cochin'
    d_Delhi = Source == 'Delhi'
    d_New_Delhi = Source == 'New_Delhi'
    d_Hyderabad = Source == 'Hyderabad'
    d_Kolkata = Source == 'Kolkata'

    # print(
    #     d_Cochin,
    #     d_Delhi,
    #     d_New_Delhi,
    #     d_Hyderabad,
    #     d_Kolkata
    # )

    prediction = model.predict([[
        Total_stops,
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

    output = round(prediction[0], 2)

    return output


if __name__ == "__main__":
    predict()
