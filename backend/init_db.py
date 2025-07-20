#!/usr/bin/env python3
"""
SWEETPEA Store Database Initialization Script
"""

import sqlite3
import os

def init_database():
    """데이터베이스 초기화 및 샘플 데이터 생성"""
    
    # 기존 DB 파일 삭제 (있다면)
    if os.path.exists('sweetpea_store.db'):
        os.remove('sweetpea_store.db')
        print("기존 데이터베이스 파일을 삭제했습니다.")
    
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
    print("데이터베이스 테이블을 생성합니다...")
    
    # 사용자 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            full_name TEXT,
            phone TEXT,
            birth_date TEXT,
            address TEXT,
            city TEXT,
            postal_code TEXT,
            country TEXT DEFAULT 'Korea',
            is_default_address BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 상품 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            image_url TEXT,
            stock INTEGER DEFAULT 0,
            is_new BOOLEAN DEFAULT 0,
            is_trending BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 장바구니 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            product_id INTEGER,
            quantity INTEGER DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
        )
    ''')
    
    print("테이블 생성 완료!")
    
    # SWEETPEA 브랜드에 맞는 상품 데이터
    sample_products = [
        # 그릇 카테고리
        {
            'name': '라벤더 꿈꾸는 그릇 세트',
            'description': '라벤더 향기처럼 부드럽고 아름다운 그릇 세트. 아침 식사가 더욱 특별해집니다.',
            'price': 45000,
            'category': 'bowls',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 15,
            'is_new': 1,
            'is_trending': 1
        },
        {
            'name': '핑크 블라썸 밥그릇',
            'description': '핑크 꽃잎이 피어난 듯한 아름다운 밥그릇. 식사 시간이 로맨틱해집니다.',
            'price': 32000,
            'category': 'bowls',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 12,
            'is_new': 0,
            'is_trending': 1
        },
        {
            'name': '스위트피 꿈꾸는 미니 그릇',
            'description': '작고 귀여운 미니 그릇. 디저트나 간식용으로 완벽합니다.',
            'price': 28000,
            'category': 'bowls',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 20,
            'is_new': 1,
            'is_trending': 0
        },
        
        # 접시 카테고리
        {
            'name': '라벤더 드림 디너 플레이트',
            'description': '저녁 식사를 더욱 우아하게 만들어주는 라벤더 컬러의 디너 플레이트.',
            'price': 38000,
            'category': 'plates',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 18,
            'is_new': 1,
            'is_trending': 1
        },
        {
            'name': '핑크 페탈 디저트 플레이트',
            'description': '꽃잎 모양의 아름다운 디저트 플레이트. 케이크나 과일을 더욱 예쁘게 보여줍니다.',
            'price': 25000,
            'category': 'plates',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 25,
            'is_new': 0,
            'is_trending': 1
        },
        {
            'name': '스위트피 가든 세라믹 플레이트',
            'description': '정원에서 피어난 꽃처럼 아름다운 세라믹 플레이트 세트.',
            'price': 42000,
            'category': 'plates',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 10,
            'is_new': 1,
            'is_trending': 0
        },
        
        # 컵 카테고리
        {
            'name': '라벤더 미스트 티컵',
            'description': '라벤더 향기처럼 부드러운 티컵. 차 마시는 시간이 더욱 특별해집니다.',
            'price': 35000,
            'category': 'cups',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 15,
            'is_new': 1,
            'is_trending': 1
        },
        {
            'name': '핑크 블라썸 머그컵',
            'description': '핑크 꽃잎이 피어난 듯한 아름다운 머그컵. 아침 커피가 더욱 달콤해집니다.',
            'price': 28000,
            'category': 'cups',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 22,
            'is_new': 0,
            'is_trending': 1
        },
        {
            'name': '스위트피 드림 와인글라스',
            'description': '와인을 더욱 우아하게 즐길 수 있는 스위트피 테마의 와인글라스.',
            'price': 48000,
            'category': 'cups',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 8,
            'is_new': 1,
            'is_trending': 0
        },
        
        # 주방용품 카테고리
        {
            'name': '라벤더 드림 주방장갑',
            'description': '라벤더 컬러의 아름다운 주방장갑. 요리할 때도 스타일리시하게.',
            'price': 18000,
            'category': 'utensils',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 30,
            'is_new': 0,
            'is_trending': 1
        },
        {
            'name': '핑크 페탈 주방용품 세트',
            'description': '핑크 꽃잎 모양의 아름다운 주방용품 세트. 주방이 더욱 예뻐집니다.',
            'price': 55000,
            'category': 'utensils',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 12,
            'is_new': 1,
            'is_trending': 0
        },
        {
            'name': '스위트피 가든 에이프런',
            'description': '정원에서 피어난 꽃처럼 아름다운 에이프런. 요리할 때도 로맨틱하게.',
            'price': 22000,
            'category': 'utensils',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 18,
            'is_new': 1,
            'is_trending': 1
        },
        
        # 액세서리 카테고리
        {
            'name': '라벤더 드림 테이블 매트',
            'description': '라벤더 컬러의 아름다운 테이블 매트. 식탁이 더욱 우아해집니다.',
            'price': 32000,
            'category': 'accessories',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 25,
            'is_new': 0,
            'is_trending': 1
        },
        {
            'name': '핑크 블라썸 나프킨 세트',
            'description': '핑크 꽃잎이 피어난 듯한 아름다운 나프킨 세트.',
            'price': 28000,
            'category': 'accessories',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 20,
            'is_new': 1,
            'is_trending': 0
        },
        {
            'name': '스위트피 가든 캔들 홀더',
            'description': '스위트피 테마의 아름다운 캔들 홀더. 저녁 식사가 더욱 로맨틱해집니다.',
            'price': 38000,
            'category': 'accessories',
            'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
            'stock': 15,
            'is_new': 1,
            'is_trending': 1
        }
    ]
    
    print("샘플 상품 데이터를 추가합니다...")
    
    for product in sample_products:
        cursor.execute('''
            INSERT INTO products (name, description, price, category, image_url, stock, is_new, is_trending)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (product['name'], product['description'], product['price'], 
              product['category'], product['image_url'], product['stock'], 
              product['is_new'], product['is_trending']))
    
    conn.commit()
    conn.close()
    
    print(f"✅ 데이터베이스 초기화 완료!")
    print(f"📦 총 {len(sample_products)}개의 상품이 추가되었습니다.")
    print(f"🗂️  데이터베이스 파일: sweetpea_store.db")

if __name__ == '__main__':
    init_database() 