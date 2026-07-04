package com.temple.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingConfirmationEmail(String toEmail, String userName, String roomName, String checkIn, String checkOut, double amount) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String htmlMsg = "<div style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);\">"
                    + "  <div style=\"background: linear-gradient(135deg, #8B0000 0%, #D4AF37 100%); padding: 30px; text-align: center; color: white;\">"
                    + "    <h1 style=\"margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;\">SIDDHAROODHA SANCTUARY</h1>"
                    + "    <p style=\"margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 2px;\">Divine Stay Confirmation</p>"
                    + "  </div>"
                    + "  <div style=\"padding: 40px 30px; background-color: #ffffff; color: #333333; line-height: 1.6;\">"
                    + "    <p style=\"font-size: 16px; margin-top: 0;\">Hari Om, <strong>" + userName + "</strong>,</p>"
                    + "    <p style=\"font-size: 15px;\">Your stay at the sacred sanctuary of Swami Siddharoodha has been successfully booked and confirmed. We look forward to welcoming you to this divine destination.</p>"
                    + "    "
                    + "    <div style=\"background-color: #f9f9f9; border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0; border-radius: 4px;\">"
                    + "      <h3 style=\"margin: 0 0 15px 0; color: #8B0000; font-size: 16px;\">Stay Details</h3>"
                    + "      <table style=\"width: 100%; font-size: 14px; border-collapse: collapse;\">"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Room Name:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + roomName + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Check-In Date:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + checkIn + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Check-Out Date:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + checkOut + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 10px 0 0 0; color: #666666; border-top: 1px solid #e0e0e0;\"><strong>Total Paid:</strong></td>"
                    + "          <td style=\"padding: 10px 0 0 0; text-align: right; color: #8B0000; font-weight: bold; border-top: 1px solid #e0e0e0; font-size: 16px;\">₹" + amount + "</td>"
                    + "        </tr>"
                    + "      </table>"
                    + "    </div>"
                    + "    "
                    + "    <p style=\"font-size: 14px; color: #666666; margin-bottom: 0;\">If you have any questions or require special assistance, please reply to this email or contact the temple administration portal.</p>"
                    + "  </div>"
                    + "  <div style=\"background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eaeaea;\">"
                    + "    <p style=\"margin: 0;\">Swami Siddharoodha Temple Trust, Old Hubli, Karnataka, India</p>"
                    + "    <p style=\"margin: 5px 0 0 0;\">This is an automated stay booking confirmation.</p>"
                    + "  </div>"
                    + "</div>";

            helper.setText(htmlMsg, true);
            helper.setTo(toEmail);
            helper.setSubject("Stay Confirmation - Siddharoodha Divine Sanctuary");
            helper.setFrom(fromEmail);

            mailSender.send(mimeMessage);
            System.out.println("Email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send booking confirmation email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendDonationConfirmationEmail(String toEmail, String userName, String purpose, double amount, String txnId, String receiptId) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String htmlMsg = "<div style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);\">"
                    + "  <div style=\"background: linear-gradient(135deg, #8B0000 0%, #D4AF37 100%); padding: 30px; text-align: center; color: white;\">"
                    + "    <h1 style=\"margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;\">SIDDHAROODHA TEMPLE TRUST</h1>"
                    + "    <p style=\"margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 2px;\">Divine Contribution Receipt</p>"
                    + "  </div>"
                    + "  <div style=\"padding: 40px 30px; background-color: #ffffff; color: #333333; line-height: 1.6;\">"
                    + "    <p style=\"font-size: 16px; margin-top: 0;\">Hari Om, <strong>" + userName + "</strong>,</p>"
                    + "    <p style=\"font-size: 15px;\">Thank you for your generous donation. Your support directly helps us maintain our daily rituals, free community meal distribution (Annadanam), goshala, and charitable initiatives.</p>"
                    + "    "
                    + "    <div style=\"background-color: #f9f9f9; border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0; border-radius: 4px;\">"
                    + "      <h3 style=\"margin: 0 0 15px 0; color: #8B0000; font-size: 16px;\">Donation Summary</h3>"
                    + "      <table style=\"width: 100%; font-size: 14px; border-collapse: collapse;\">"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Donor Name:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + userName + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Cause/Purpose:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + purpose + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Receipt Number:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333; font-family: monospace;\">" + receiptId + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Transaction ID:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333; font-family: monospace;\">" + txnId + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 10px 0 0 0; color: #666666; border-top: 1px solid #e0e0e0;\"><strong>Amount Offered:</strong></td>"
                    + "          <td style=\"padding: 10px 0 0 0; text-align: right; color: #8B0000; font-weight: bold; border-top: 1px solid #e0e0e0; font-size: 16px;\">₹" + amount + "</td>"
                    + "        </tr>"
                    + "      </table>"
                    + "    </div>"
                    + "    "
                    + "    <p style=\"font-size: 14px; color: #666666; margin-bottom: 0;\">All donations are eligible for tax exemption under section 80G of the Income Tax Act. A formal PDF receipt will be sent shortly.</p>"
                    + "  </div>"
                    + "  <div style=\"background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eaeaea;\">"
                    + "    <p style=\"margin: 0;\">Swami Siddharoodha Temple Trust, Old Hubli, Karnataka, India</p>"
                    + "    <p style=\"margin: 5px 0 0 0;\">May the blessings of Sadguru Shri Siddharoodha Swamiji be with you.</p>"
                    + "  </div>"
                    + "</div>";

            helper.setText(htmlMsg, true);
            helper.setTo(toEmail);
            helper.setSubject("Donation Confirmation - Siddharoodha Temple");
            helper.setFrom(fromEmail);

            mailSender.send(mimeMessage);
            System.out.println("Donation Email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send donation confirmation email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendOrderConfirmationEmail(String toEmail, String userName, String orderId, String itemsSummary, double amount, String address) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String htmlMsg = "<div style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);\">"
                    + "  <div style=\"background: linear-gradient(135deg, #8B0000 0%, #D4AF37 100%); padding: 30px; text-align: center; color: white;\">"
                    + "    <h1 style=\"margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;\">SIDDHAROODHA PRASADAM</h1>"
                    + "    <p style=\"margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 2px;\">Sacred Order Confirmed</p>"
                    + "  </div>"
                    + "  <div style=\"padding: 40px 30px; background-color: #ffffff; color: #333333; line-height: 1.6;\">"
                    + "    <p style=\"font-size: 16px; margin-top: 0;\">Hari Om, <strong>" + userName + "</strong>,</p>"
                    + "    <p style=\"font-size: 15px;\">Your order for holy temple Prasadam has been successfully processed. The items are prepared with clean, pure ingredients in the temple kitchens and will be shipped to your address shortly.</p>"
                    + "    "
                    + "    <div style=\"background-color: #f9f9f9; border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0; border-radius: 4px;\">"
                    + "      <h3 style=\"margin: 0 0 15px 0; color: #8B0000; font-size: 16px;\">Order Summary</h3>"
                    + "      <table style=\"width: 100%; font-size: 14px; border-collapse: collapse;\">"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Order ID:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333; font-family: monospace;\">" + orderId + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Blessed Items:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + itemsSummary + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Shipping Address:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + address + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 10px 0 0 0; color: #666666; border-top: 1px solid #e0e0e0;\"><strong>Total Contribution:</strong></td>"
                    + "          <td style=\"padding: 10px 0 0 0; text-align: right; color: #8B0000; font-weight: bold; border-top: 1px solid #e0e0e0; font-size: 16px;\">₹" + amount + "</td>"
                    + "        </tr>"
                    + "      </table>"
                    + "    </div>"
                    + "    "
                    + "    <p style=\"font-size: 14px; color: #666666; margin-bottom: 0;\">You will receive shipping tracker details once the blessings leave our sacred kitchen stores.</p>"
                    + "  </div>"
                    + "  <div style=\"background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eaeaea;\">"
                    + "    <p style=\"margin: 0;\">Swami Siddharoodha Temple Trust, Old Hubli, Karnataka, India</p>"
                    + "    <p style=\"margin: 5px 0 0 0;\">Thank you for receiving the divine prasadam blessings.</p>"
                    + "  </div>"
                    + "</div>";

            helper.setText(htmlMsg, true);
            helper.setTo(toEmail);
            helper.setSubject("Prasadam Order Confirmed - Siddharoodha Temple");
            helper.setFrom(fromEmail);

            mailSender.send(mimeMessage);
            System.out.println("Prasadam Order Email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send order confirmation email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendSevaConfirmationEmail(String toEmail, String userName, String bookingId, String poojasSummary, String sevaDate, String gotra, String nakshatra, double amount) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String htmlMsg = "<div style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);\">"
                    + "  <div style=\"background: linear-gradient(135deg, #8B0000 0%, #D4AF37 100%); padding: 30px; text-align: center; color: white;\">"
                    + "    <h1 style=\"margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;\">SIDDHAROODHA HOLY SEVAS</h1>"
                    + "    <p style=\"margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 2px;\">Seva Booking Confirmed</p>"
                    + "  </div>"
                    + "  <div style=\"padding: 40px 30px; background-color: #ffffff; color: #333333; line-height: 1.6;\">"
                    + "    <p style=\"font-size: 16px; margin-top: 0;\">Hari Om, <strong>" + userName + "</strong>,</p>"
                    + "    <p style=\"font-size: 15px;\">Your Sevas have been booked successfully in the temple's ledger. The priests will chant the holy mantras and seek blessings in the name of your family during the rituals.</p>"
                    + "    "
                    + "    <div style=\"background-color: #f9f9f9; border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0; border-radius: 4px;\">"
                    + "      <h3 style=\"margin: 0 0 15px 0; color: #8B0000; font-size: 16px;\">Seva Summary</h3>"
                    + "      <table style=\"width: 100%; font-size: 14px; border-collapse: collapse;\">"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Booking ID:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333; font-family: monospace;\">" + bookingId + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Booked Sevas:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + poojasSummary + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Seva Performance Date:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + sevaDate + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Gotra / Nakshatra:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + gotra + " / " + nakshatra + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 10px 0 0 0; color: #666666; border-top: 1px solid #e0e0e0;\"><strong>Total Contribution:</strong></td>"
                    + "          <td style=\"padding: 10px 0 0 0; text-align: right; color: #8B0000; font-weight: bold; border-top: 1px solid #e0e0e0; font-size: 16px;\">₹" + amount + "</td>"
                    + "        </tr>"
                    + "      </table>"
                    + "    </div>"
                    + "    "
                    + "    <p style=\"font-size: 14px; color: #666666; margin-bottom: 0;\">You can download the digital receipt and entry pass at any time from your seeker portal dashboard.</p>"
                    + "  </div>"
                    + "  <div style=\"background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eaeaea;\">"
                    + "    <p style=\"margin: 0;\">Swami Siddharoodha Temple Trust, Old Hubli, Karnataka, India</p>"
                    + "    <p style=\"margin: 5px 0 0 0;\">May the blessings of Swami Siddharoodha protect and guide you.</p>"
                    + "  </div>"
                    + "</div>";

            helper.setText(htmlMsg, true);
            helper.setTo(toEmail);
            helper.setSubject("Seva Booking Confirmed - Siddharoodha Temple");
            helper.setFrom(fromEmail);

            mailSender.send(mimeMessage);
            System.out.println("Seva Booking Email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send seva confirmation email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendDarshanPassEmail(String toEmail, String userName, String bookingId, String bookingDate, String slotTime, String gotra, int groupSize) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + bookingId;

            String htmlMsg = "<div style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);\">"
                    + "  <div style=\"background: linear-gradient(135deg, #8B0000 0%, #D4AF37 100%); padding: 30px; text-align: center; color: white;\">"
                    + "    <h1 style=\"margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;\">SIDDHAROODHA CROWD CONTROL</h1>"
                    + "    <p style=\"margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 2px;\">Divine Darshan Entry Pass</p>"
                    + "  </div>"
                    + "  <div style=\"padding: 40px 30px; background-color: #ffffff; color: #333333; line-height: 1.6;\">"
                    + "    <p style=\"font-size: 16px; margin-top: 0;\">Hari Om, <strong>" + userName + "</strong>,</p>"
                    + "    <p style=\"font-size: 15px;\">Your slot check-in registration for sacred Darshan has been confirmed. Please present the QR code below at the temple entrance queue gate during your scheduled hour.</p>"
                    + "    "
                    + "    <div style=\"text-align: center; margin: 30px 0;\">"
                    + "      <img src=\"" + qrUrl + "\" alt=\"Booking QR Code\" style=\"border: 4px solid #8B0000; padding: 10px; border-radius: 8px; width: 150px; height: 150px;\" />"
                    + "      <p style=\"font-family: monospace; font-size: 12px; color: #666666; margin-top: 10px;\">PASS ID: " + bookingId + "</p>"
                    + "    </div>"
                    + "    "
                    + "    <div style=\"background-color: #f9f9f9; border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0; border-radius: 4px;\">"
                    + "      <h3 style=\"margin: 0 0 15px 0; color: #8B0000; font-size: 16px;\">Pass Details</h3>"
                    + "      <table style=\"width: 100%; font-size: 14px; border-collapse: collapse;\">"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Pilgrim Name:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + userName + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Gotra:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + gotra + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Scheduled Date:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + bookingDate + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Time Slot:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333; font-weight: bold; color: #8B0000;\">" + slotTime + "</td>"
                    + "        </tr>"
                    + "        <tr>"
                    + "          <td style=\"padding: 6px 0; color: #666666;\"><strong>Group Size:</strong></td>"
                    + "          <td style=\"padding: 6px 0; text-align: right; color: #333333;\">" + groupSize + " Persons</td>"
                    + "        </tr>"
                    + "      </table>"
                    + "    </div>"
                    + "    "
                    + "    <p style=\"font-size: 14px; color: #666666; margin-bottom: 0;\">Please ensure you arrive at least 15 minutes before your slot begins. Carry a valid photo ID matching the pilgrim name.</p>"
                    + "  </div>"
                    + "  <div style=\"background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eaeaea;\">"
                    + "    <p style=\"margin: 0;\">Swami Siddharoodha Temple Trust, Old Hubli, Karnataka, India</p>"
                    + "    <p style=\"margin: 5px 0 0 0;\">This is a dynamic crowd control entry reservation pass.</p>"
                    + "  </div>"
                    + "</div>";

            helper.setText(htmlMsg, true);
            helper.setTo(toEmail);
            helper.setSubject("Darshan Entrance Pass - Siddharoodha Math");
            helper.setFrom(fromEmail);

            mailSender.send(mimeMessage);
            System.out.println("Darshan Slot Booking Email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send darshan confirmation email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
