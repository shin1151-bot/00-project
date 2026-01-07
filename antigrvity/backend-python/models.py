"""
[DB 모델 정의 파일]
SQLAlchemy를 사용하여 데이터베이스 테이블 구조를 정의합니다.
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class UserDB(Base):
    """사용자(계좌) 테이블"""
    __tablename__ = "users" # 실제 DB 테이블 이름
    
    id = Column(String, primary_key=True, index=True) # 고유 ID (PK)
    name = Column(String)                             # 사용자 이름
    pinCode = Column(String)                          # 비밀번호 (PIN)
    accountNumber = Column(String, unique=True)       # 계좌번호 (중복 불가)
    balance = Column(Integer)                         # 잔액 (정수형)
    currency = Column(String, default="KRW")          # 통화 (기본값: 원화)
    
    # 관계 설정: 사용자는 여러 개의 거래내역을 가질 수 있음
    transactions = relationship("TransactionDB", back_populates="owner")

class TransactionDB(Base):
    """거래 내역 테이블"""
    __tablename__ = "transactions"
    
    id = Column(String, primary_key=True, index=True) # 거래 ID
    accountId = Column(String, ForeignKey("users.id"))# 외래키 (어떤 유저의 거래인지)
    type = Column(String)                             # 유형 (DEPOSIT/WITHDRAW)
    amount = Column(Integer)                          # 금액
    description = Column(String)                      # 적요 (메모)
    transactedAt = Column(DateTime, default=datetime.now) # 거래 일시
    
    # 관계 설정: 거래내역은 하나의 사용자에 속함
    owner = relationship("UserDB", back_populates="transactions")

class AssetDB(Base):
    """보유 자산 테이블 (주식/코인 등)"""
    __tablename__ = "assets"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String)         # 자산명 (예: 삼성전자)
    value = Column(Integer)       # 현재 가치
    change = Column(Integer)      # 전일 대비 변동액
    changePercent = Column(Float) # 변동률 (%)

