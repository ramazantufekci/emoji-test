import React from 'react';
import {render,screen,fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import EmojiResults from './EmojiResults';

import App from './App';


describe("emoji results all test",()=>{
    let emojijoy,input,text,emoji;
    //Başlık kısmının başarılı bir şekilde render edildiğini kontrol edecek
  test('Başlık var mı ', () => {
    render(<App />)
    const header = screen.getByText(/Emoji Search/i);
    expect(header).toBeInTheDocument();
  });

  //Uygulama ilk açıldığında emoji listesinin başarılı bir şekilde render edildiğini kontrol edecek olan test

  test('Açılışta emoji listesi görünüyor mu?', () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName('component-emoji-results').length).toBe(1);
  });

  //Görüntülenen listedeki eleman sayısı doğru mu?
  test('Görüntülenen listedeki eleman sayısı doğru mu', () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName('component-emoji-result-row').length).toBe(20);
  });

  //Bir filtreleme işlemi yapıldığında, emoji listesinin bu filtreye uygun şekilde mi

  test('filtreleme  doğru çalışıyor mu', () => {
    render(<App />)
    input = screen.getByPlaceholderText(/emoji ara/i)
    text = "1234"
    emoji = screen.getByText(/100/i)
    fireEvent.change(input, { target: { value: text } })
    expect(emoji).not.toBeInTheDocument() 

  });

  // Kopyalama testi
    test("Sağ tık yapıldığında kopyalama işlemi gerçekleşiyor mu?",()=>{
        render(<App />)
        emojijoy = screen.getByText(/Joy/i)
        let clipboardText="";       
        userEvent.click(emojijoy)
        clipboardText=window.copyEmoji;
        //expect(clipboardText).toEqual(emojijoy.parentElement.dataset.clipboardText);
    });
});

