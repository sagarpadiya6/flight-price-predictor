#!/usr/bin/env python

from setuptools import setup

setup(
    name='flight_price',
    version='0.0.1',
    packages=['flight_price'],
    install_requires=[
        'click',
    ],
    python_requires=">=3.9",
    entry_points={'console_scripts': [
        'flight_price=flight_price.__main__:main'
    ]},
    include_package_data=True,
    license='MIT',
    author='Sagar',
    author_email='sagarpadiya7000@gmail.com',
    description='Flight Price Prediction'
)
