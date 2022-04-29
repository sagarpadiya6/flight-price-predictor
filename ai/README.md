# Flight Fare Prediction

## Table of Content

- [Flight Fare Prediction](#flight-fare-prediction)
  - [Table of Content](#table-of-content)
  - [Demo](#demo)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Directory Tree](#directory-tree)
  - [Technologies Used](#technologies-used)
  - [Future Scope](#future-scope)

## Demo

Link: [https://flight-price-prediction-api.herokuapp.com/](https://flight-price-prediction-api.herokuapp.com/)

[![](https://i.imgur.com/R1g2wvC.png)](https://flight-price-prediction-api.herokuapp.com/)

[![](https://i.imgur.com/p0aeL6c.png)](https://flight-price-prediction-api.herokuapp.com/)

## Overview

This is a cli tool which predicts fare of Indian flight ticket.

## Installation

The Code is written in `Python 3.9.12`. If you don't have Python installed you can find it [here](https://www.python.org/downloads/).

```bash
pip3 install numpy pandas matplotlib seaborn sklearn openpyxl click
```

To test the working

```bash
python3 flight_price/flight_price.py --dep_date_time='2022-07-12T19:30' --arr_date_time='2022-07-12T20:30' --stops=0 --airline='IndiGo' --source='Chennai' --destination='Delhi'
```


## Directory Tree

```bash
├── README.md
├── app.py
├── Data_Train.xlsx
├── Data_Test.xlsx
├── flight_price.ipynb
├── flight_price.pkl
├── requirements.txt
```

## Technologies Used

![Logo](https://forthebadge.com/images/badges/made-with-python.svg)

[<img target="_blank" src="https://flask.palletsprojects.com/en/1.1.x/_images/flask-logo.png" width=170>](https://flask.palletsprojects.com/en/1.1.x/)
[<img target="_blank" src="https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png" width=200>](https://scikit-learn.org/stable/)

## Future Scope

- Use multiple Algorithms
