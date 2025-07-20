from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# 데이터베이스 초기화
def init_db():
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
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
    
    # 기존 상품이 없으면 샘플 데이터 추가
    cursor.execute('SELECT COUNT(*) FROM products')
    if cursor.fetchone()[0] == 0:
        for product in sample_products:
            cursor.execute('''
                INSERT INTO products (name, description, price, category, image_url, stock, is_new, is_trending)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (product['name'], product['description'], product['price'], 
                  product['category'], product['image_url'], product['stock'], 
                  product['is_new'], product['is_trending']))
    
    conn.commit()
    conn.close()

# API 라우트

@app.route('/api/products', methods=['GET'])
def get_products():
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
    category = request.args.get('category')
    is_new = request.args.get('is_new')
    is_trending = request.args.get('is_trending')
    
    query = 'SELECT * FROM products WHERE 1=1'
    params = []
    
    if category:
        query += ' AND category = ?'
        params.append(category)
    
    if is_new:
        query += ' AND is_new = ?'
        params.append(int(is_new))
    
    if is_trending:
        query += ' AND is_trending = ?'
        params.append(int(is_trending))
    
    cursor.execute(query, params)
    products = cursor.fetchall()
    conn.close()
    
    product_list = []
    for product in products:
        product_list.append({
            'id': product[0],
            'name': product[1],
            'description': product[2],
            'price': product[3],
            'category': product[4],
            'image_url': product[5],
            'stock': product[6],
            'is_new': bool(product[7]),
            'is_trending': bool(product[8]),
            'created_at': product[9]
        })
    
    return jsonify(product_list)

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, description, price, category, image_url, stock, is_new, is_trending
        FROM products WHERE id = ?
    ''', (product_id,))
    
    product = cursor.fetchone()
    conn.close()
    
    if product:
        return jsonify({
            'id': product[0],
            'name': product[1],
            'description': product[2],
            'price': product[3],
            'category': product[4],
            'image_url': product[5],
            'stock': product[6],
            'is_new': bool(product[7]),
            'is_trending': bool(product[8])
        })
    else:
        return jsonify({'error': '상품을 찾을 수 없습니다.'}), 404

@app.route('/api/cart', methods=['GET'])
def get_cart():
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.image_url
        FROM cart c
        JOIN products p ON c.product_id = p.id
    ''')
    
    cart_items = cursor.fetchall()
    conn.close()
    
    cart_list = []
    for item in cart_items:
        cart_list.append({
            'id': item[0],
            'product_id': item[1],
            'quantity': item[2],
            'name': item[3],
            'price': item[4],
            'image_url': item[5],
            'total': item[4] * item[2]
        })
    
    return jsonify(cart_list)

@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
    # 기존 장바구니에 같은 상품이 있는지 확인
    cursor.execute('SELECT id, quantity FROM cart WHERE product_id = ?', (product_id,))
    existing_item = cursor.fetchone()
    
    if existing_item:
        # 수량 업데이트
        new_quantity = existing_item[1] + quantity
        cursor.execute('UPDATE cart SET quantity = ? WHERE id = ?', (new_quantity, existing_item[0]))
    else:
        # 새 아이템 추가
        cursor.execute('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', (product_id, quantity))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Added to cart successfully'})

@app.route('/api/cart/<int:item_id>', methods=['DELETE'])
def remove_from_cart(item_id):
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
    cursor.execute('DELETE FROM cart WHERE id = ?', (item_id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Removed from cart successfully'})

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = [
        {'id': 'bowls', 'name': '그릇', 'icon': '🍽️'},
        {'id': 'plates', 'name': '접시', 'icon': '🥘'},
        {'id': 'cups', 'name': '컵/잔', 'icon': '☕'},
        {'id': 'utensils', 'name': '수저/커트러리', 'icon': '🍴'},
        {'id': 'accessories', 'name': '액세서리', 'icon': '🎀'}
    ]
    return jsonify(categories)

@app.route('/api/products/new', methods=['GET'])
def get_new_products():
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM products WHERE is_new = 1 ORDER BY created_at DESC')
    products = cursor.fetchall()
    conn.close()
    
    product_list = []
    for product in products:
        product_list.append({
            'id': product[0],
            'name': product[1],
            'description': product[2],
            'price': product[3],
            'category': product[4],
            'image_url': product[5],
            'stock': product[6],
            'is_new': bool(product[7]),
            'is_trending': bool(product[8]),
            'created_at': product[9]
        })
    
    return jsonify(product_list)

@app.route('/api/products/trending', methods=['GET'])
def get_trending_products():
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM products WHERE is_trending = 1 ORDER BY created_at DESC')
    products = cursor.fetchall()
    conn.close()
    
    product_list = []
    for product in products:
        product_list.append({
            'id': product[0],
            'name': product[1],
            'description': product[2],
            'price': product[3],
            'category': product[4],
            'image_url': product[5],
            'stock': product[6],
            'is_new': bool(product[7]),
            'is_trending': bool(product[8]),
            'created_at': product[9]
        })
    
    return jsonify(product_list)

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # 실제로는 이메일 발송이나 데이터베이스 저장 로직이 들어갑니다
    print(f"Contact form submitted: {name} ({email}) - {message}")
    
    return jsonify({'message': 'Contact form submitted successfully'})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('full_name')
    phone = data.get('phone')
    birth_date = data.get('birth_date')
    address = data.get('address')
    city = data.get('city')
    postal_code = data.get('postal_code')
    country = data.get('country', 'Korea')
    is_default_address = data.get('is_default_address', True)
    
    if not username or not email or not password:
        return jsonify({'error': '사용자명, 이메일, 비밀번호는 필수입니다.'}), 400
    
    # 주소 필수 검증
    if not address or not city or not postal_code:
        return jsonify({'error': '주소, 도시, 우편번호는 필수입니다.'}), 400
    
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
    # 사용자명 중복 확인
    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    if cursor.fetchone():
        conn.close()
        return jsonify({'error': '이미 사용 중인 사용자명입니다.'}), 400
    
    # 이메일 중복 확인
    cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
    if cursor.fetchone():
        conn.close()
        return jsonify({'error': '이미 사용 중인 이메일입니다.'}), 400
    
    # 새 사용자 등록 (실제로는 비밀번호 해싱을 해야 합니다)
    cursor.execute('''
        INSERT INTO users (username, email, password, full_name, phone, birth_date, address, city, postal_code, country, is_default_address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (username, email, password, full_name, phone, birth_date, address, city, postal_code, country, is_default_address))
    
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({
        'message': '회원가입이 완료되었습니다!',
        'user_id': user_id,
        'username': username,
        'full_name': full_name
    })

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': '사용자명과 비밀번호를 입력해주세요.'}), 400
    
    conn = sqlite3.connect('sweetpea_store.db')
    cursor = conn.cursor()
    
    # 사용자 확인
    cursor.execute('SELECT id, username, email, full_name FROM users WHERE username = ? AND password = ?', 
                   (username, password))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return jsonify({
            'message': '로그인 성공!',
            'user_id': user[0],
            'username': user[1],
            'email': user[2],
            'full_name': user[3]
        })
    else:
        return jsonify({'error': '사용자명 또는 비밀번호가 올바르지 않습니다.'}), 401

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000) 