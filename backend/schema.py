from typing import Optional

from pydantic import BaseModel


class SchemaTask(BaseModel):
    title: str
    is_completed: Optional[bool] = False

    class Config:
        orm_mode = True
