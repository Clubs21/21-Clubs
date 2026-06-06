from pydantic import BaseModel, EmailStr
from typing import Optional, List


class LoginRequest(BaseModel):
    email: str
    password: str


class TwoFARequest(BaseModel):
    email: str
    code: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    email: Optional[str] = None
    perfil: Optional[str] = None


class UserPublic(BaseModel):
    id: str
    nome: str
    email: str
    empresa: str
    segmento: str
    perfil: str
    permissoes: List[str]
    avatar: str
    empresa_detalhe: Optional[dict] = None


class LoginResponse(BaseModel):
    step: str  # "2fa" | "done"
    token: Optional[str] = None
    user: Optional[UserPublic] = None
    message: str = ""
