"""
[데이터 스키마 정의 파일]
Pydantic을 사용하여 API 요청 및 응답 데이터의 형식을 정의하고 검증합니다.
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# --- Request DTOs (요청 데이터) ---

class LoginDto(BaseModel):
    """로그인 요청 시 받는 데이터"""
    pinCode: str # 6자리 비밀번호

class TransferDto(BaseModel):
    """이체 요청 시 받는 데이터"""
    amount: int   # 송금할 금액
    recipient: str # 받는 사람 (혹은 계좌)

# --- Response DTOs (응답 데이터) ---

class UserResponse(BaseModel):
    """사용자(계좌) 정보 응답"""
    id: str
    name: str
    accountNumber: str
    balance: int
    currency: str
    
    class Config:
        from_attributes = True # ORM 객체(SQLAlchemy)를 Pydantic 모델로 변환 허용

class TransactionResponse(BaseModel):
    """거래 내역 응답"""
    id: str
    accountId: str
    type: str 
    amount: int
    description: str
    transactedAt: datetime
    
    class Config:
        from_attributes = True

class AssetResponse(BaseModel):
    """자산 정보 응답"""
    id: str
    name: str
    value: int
    change: int
    changePercent: float
    
    class Config:
        from_attributes = True

