from importlib_metadata import entry_points
from setuptools import setup, find_packages

setup(
    name='flight_price',
    version='1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'click'
    ],
    entry_points='''
        [console_scripts]
        flight=flight_price.cli:cli
    '''
)
