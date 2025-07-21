<?php
$client_id = '58aababbb9c34fb89478fc534f734a10';
$client_secret = '8a72859ca4614e909a6e0050d82b69db';
$redirect_uri = 'https://beijasapo.com/painelUser.php';

$data = json_decode(file_get_contents('php://input'), true);
$code = $data['code'] ?? '';

if (!$code) {
  echo json_encode(['error' => 'missing_code']);
  http_response_code(400);
  exit;
}

$auth = base64_encode($client_id . ':' . $client_secret);

$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => 'https://accounts.spotify.com/api/token',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Authorization: Basic ' . $auth,
    'Content-Type: application/x-www-form-urlencoded'
  ],
  CURLOPT_POSTFIELDS => http_build_query([
    'grant_type' => 'authorization_code',
    'code' => $code,
    'redirect_uri' => $redirect_uri
  ])
]);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
