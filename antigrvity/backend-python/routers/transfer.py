"""
[이체(송금) 라우터]
잔액 이체 및 거래내역 생성 로직을 담당합니다.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
import random
import models, schemas, database

router = APIRouter(
    tags=["transfer"]
)

@router.post("/transfer")
def transfer(dto: schemas.TransferDto, db: Session = Depends(database.get_db)):
    """
    [이체 API]
    1. 보내는 사람의 잔액을 확인하고 차감합니다.
    2. '출금(WITHDRAW)' 거래 내역을 생성하여 DB에 저장합니다.
    3. 모든 과정이 성공하면 DB에 커밋(Commit)합니다.
    """
    # 1. 보내는 사람 조회 (데모: 첫 번째 사용자)
    user = db.query(models.UserDB).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    # 2. 잔액 부족 체크
    if user.balance < dto.amount:
        raise HTTPException(status_code=400, detail="잔액이 부족합니다.")
        
    try:
        # 3. 잔액 차감 (업데이트)
        user.balance -= dto.amount
        
        # 4. 거래 내역 생성 (Insert)
        new_tx = models.TransactionDB(
            id=f"tx-{random.randint(10000, 99999)}", # 랜덤 ID 생성
            accountId=user.id,
            type="WITHDRAW",
            amount=dto.amount,
            description=f"송금 - {dto.recipient}",
            transactedAt=datetime.now()
        )
        db.add(new_tx)
        
        # 5. DB 반영 (Commit)
        # 이 시점에 잔액 차감과 거래내역 생성이 동시에 확정됩니다. (트랜잭션)
        db.commit()
        db.refresh(user) # 최신 잔액 정보 다시 불러오기
        
        return {"success": True, "balance": user.balance}
    except Exception as e:
        # 에러 발생 시 롤백 (아무 일도 없던 것으로 되돌림)
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
