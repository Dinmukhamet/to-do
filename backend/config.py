from typing import Set
from pydantic import BaseSettings


class Settings(BaseSettings):
    backend_host: str = "localhost"
    backend_port: str = "8000"
    database_url: str


settings = Settings()