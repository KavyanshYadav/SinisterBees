SERVER_MODE = True

DEFAULT_SERVER = '0.0.0.0'
DEFAULT_SERVER_PORT = 80

pgadmin_servers = [
    {
        "name": "SinisterBees Database",
        "host": "db",          
        "port": 5432,         
        "username": "postgres",
        "password": "password", 
        "ssl_mode": "prefer"   
    }
]
