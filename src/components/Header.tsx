import React, { useState } from 'react';
import styled from 'styled-components';

const HeaderBar = styled.header`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 72px;
  box-sizing: border-box;
  border-bottom: 1.5px solid #f3e6f7;
  position: relative;
  z-index: 9999;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #d16ba5;
  letter-spacing: 2px;
  cursor: pointer;
  gap: 12px;
`;
const LogoFlower = styled.span`
  font-size: 2.1rem;
  margin-right: 2px;
`;
const SearchBarWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;
const SearchBar = styled.input`
  width: 420px;
  max-width: 90vw;
  padding: 13px 44px 13px 22px;
  border: 2px solid #ffb6c1;
  border-radius: 32px;
  font-size: 0.8rem;
  outline: none;
  background: #fff;
  transition: border 0.2s;
  box-shadow: none;
  &:focus {
    border: 2px solid #dda0dd;
  }
`;
const SearchIcon = styled.span`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #dda0dd;
  pointer-events: none;
`;
const SearchDropdown = styled.div`
  position: absolute;
  top: 54px;
  left: 50%;
  transform: translateX(-50%);
  width: 480px;
  max-width: 96vw;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 8px 32px rgba(221,160,221,0.13);
  display: flex;
  z-index: 10000;
  padding: 0;
  overflow: hidden;
`;
const SearchCol = styled.div`
  flex: 1;
  padding: 28px 20px 20px 20px;
  min-width: 0;
`;
const SearchColTitle = styled.div`
  font-size: 1.01rem;
  font-weight: 600;
  color: #d16ba5;
  margin-bottom: 14px;
`;
const SearchList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const SearchListItem = styled.li`
  font-size: 0.98rem;
  color: #444;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const SearchRank = styled.span`
  font-size: 1.05rem;
  color: #dda0dd;
  font-weight: 700;
  width: 20px;
  display: inline-block;
`;
const SearchNew = styled.span`
  background: #ffb6c1;
  color: #fff;
  font-size: 0.8rem;
  border-radius: 8px;
  padding: 2px 7px;
  margin-left: 6px;
`;
const SearchUp = styled.span`
  color: #d16ba5;
  font-size: 1.05rem;
  margin-left: 4px;
`;
const SearchEmpty = styled.div`
  color: #bbb;
  font-size: 0.97rem;
  margin-top: 10px;
`;
const Menu = styled.nav`
  display: flex;
  align-items: center;
  gap: 22px;
  font-size: 1.01rem;
  color: #888;
`;
const MenuItem = styled.a`
  color: #888;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s;
  &:hover { color: #d16ba5; }
`;

const Header: React.FC = () => {
  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchBarFocus, setSearchBarFocus] = useState(false);
  const recentKeywords: string[] = [];
  const trendingKeywords = [
    { word: '핑크쿠션', up: true },
    { word: '라벤더크림', up: false, new: true },
    { word: '머그컵', up: true },
    { word: '플라워', new: true },
    { word: '테이블웨어', up: false },
    { word: '디퓨저', up: true },
    { word: '선물세트', new: true },
    { word: '아로마', up: false },
    { word: '캔들', up: true },
    { word: '쿠션', new: true },
  ];
  return (
    <HeaderBar>
      <Logo>
        <LogoFlower>🌸</LogoFlower>
        SWEETPEA
      </Logo>
      <SearchBarWrap>
        <SearchBar
          placeholder="마봉이, 뽕양이, 봉봉이, 봉봉이네 검색"
          value={searchBarValue}
          onChange={e => setSearchBarValue(e.target.value)}
          onFocus={() => setSearchBarFocus(true)}
          onBlur={() => setTimeout(()=>setSearchBarFocus(false), 150)}
        />
        <SearchIcon>🔍</SearchIcon>
        {searchBarFocus && (
          <SearchDropdown>
            <SearchCol>
              <SearchColTitle>최근 검색어</SearchColTitle>
              {recentKeywords.length === 0 ? (
                <SearchEmpty>최근 검색어가 없어요.</SearchEmpty>
              ) : (
                <SearchList>
                  {recentKeywords.map((k, i) => (
                    <SearchListItem key={i}>{k}</SearchListItem>
                  ))}
                </SearchList>
              )}
            </SearchCol>
            <SearchCol>
              <SearchColTitle>급상승 검색어</SearchColTitle>
              <SearchList>
                {trendingKeywords.map((k, i) => (
                  <SearchListItem key={i}>
                    <SearchRank>{i+1}</SearchRank>
                    {k.word}
                    {k.new && <SearchNew>NEW</SearchNew>}
                    {k.up && <SearchUp>▲</SearchUp>}
                  </SearchListItem>
                ))}
              </SearchList>
            </SearchCol>
          </SearchDropdown>
        )}
      </SearchBarWrap>
      <Menu>
        <MenuItem>회원가입</MenuItem>
        <MenuItem>로그인</MenuItem>
        <MenuItem>장바구니</MenuItem>
        <MenuItem>고객센터</MenuItem>
      </Menu>
    </HeaderBar>
  );
};

export default Header; 