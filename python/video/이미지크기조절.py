import os
import glob
from PIL import Image

# 설정
TARGET_FOLDER = r"C:\Users\user\Desktop\유튜브\이미지\00 input"
OUTPUT_FOLDER = r"C:\Users\user\Desktop\유튜브\이미지\Resized"

def resize_images():
    print(f"=== 이미지 크기 조절 (Resizer) ===")
    print(f"대상 폴더: {TARGET_FOLDER}")
    
    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)

    extensions = ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.bmp']
    image_files = []
    
    for ext in extensions:
        image_files.extend(glob.glob(os.path.join(TARGET_FOLDER, ext)))

    if not image_files:
        print("변환할 이미지 파일이 없습니다.")
        return

    print(f"\n발견된 이미지 ({len(image_files)}개).")
    
    print("\n[설정] 조절할 크기를 선택하세요.")
    print("1. 비율(%)로 조절 (예: 50% -> 반으로 줄임)")
    print("2. 가로 폭(px) 고정 (세로는 비율 유지)")
    mode = input("선택 (1/2): ").strip()
    
    scale_factor = 1.0
    fixed_width = 0

    if mode == '1':
        per = input("원하는 비율(%)을 입력하세요 (예: 50): ").strip()
        try:
            scale_factor = float(per) / 100.0
        except:
            print("잘못된 입력입니다.")
            return
    elif mode == '2':
        w = input("원하는 가로 폭(px)을 입력하세요 (예: 1920): ").strip()
        try:
            fixed_width = int(w)
        except:
            print("잘못된 입력입니다.")
            return
    else:
        print("잘못된 선택입니다.")
        return

    for img_path in image_files:
        filename = os.path.basename(img_path)
        print(f"처리 중: {filename}...", end="")
        
        try:
            with Image.open(img_path) as img:
                # 크기 계산
                if mode == '1':
                    new_width = int(img.width * scale_factor)
                    new_height = int(img.height * scale_factor)
                else:
                    new_width = fixed_width
                    # 비율 유지: new_h = old_h * (new_w / old_w)
                    new_height = int(img.height * (fixed_width / img.width))
                
                # 리사이징 (LANCZOS 사용)
                resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # 저장
                save_path = os.path.join(OUTPUT_FOLDER, f"Resized_{filename}")
                
                if filename.lower().endswith(('.jpg', '.jpeg')):
                    try:
                        resized_img.save(save_path, quality=95)
                    except OSError: # RGB convert needed
                         resized_img.convert('RGB').save(save_path, quality=95)
                else:
                    resized_img.save(save_path)
                    
            print(f" -> {new_width}x{new_height} [완료]")
            
        except Exception as e:
            print(f" [실패] {e}")

    print(f"\n모든 작업이 완료되었습니다.")
    print(f"저장 위치: {OUTPUT_FOLDER}")

if __name__ == "__main__":
    resize_images()
