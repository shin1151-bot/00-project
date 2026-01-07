from database import SessionLocal
from models import UserDB, TransactionDB, AssetDB
from sqlalchemy.orm import Session

def print_table_data():
    db: Session = SessionLocal()
    try:
        print("\n" + "="*50)
        print("👤 [사용자 및 계좌 정보 (Users)]")
        print("="*50)
        users = db.query(UserDB).all()
        for u in users:
            print(f"ID: {u.id} | 이름: {u.name} | 계좌: {u.accountNumber} | 잔액: {u.balance:,}원 | PIN: {u.pinCode}")

        print("\n" + "="*50)
        print("📜 [거래 내역 (Transactions)]")
        print("="*50)
        txs = db.query(TransactionDB).order_by(TransactionDB.transactedAt.desc()).all()
        if not txs:
            print("(거래 내역 없음)")
        for t in txs:
            print(f"[{t.transactedAt.strftime('%Y-%m-%d %H:%M')}] {t.type} | {t.amount:,}원 | {t.description}")

        print("\n" + "="*50)
        print("💎 [보유 자산 (Assets)]")
        print("="*50)
        assets = db.query(AssetDB).all()
        for a in assets:
            print(f"{a.name}: {a.value:,}원 ({a.changePercent}%)")

    except Exception as e:
        print(f"Error reading DB: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    print_table_data()
