<h1>Test</h1>
<? php
echo 'Step 0';

use Google\Auth\Credentials\UserRefreshCredentials;
use Google\Photos\Library\V1\PhotosLibraryClient;
use Google\Photos\Library\V1\PhotosLibraryResourceFactory;


try {
    // Use the OAuth flow provided by the Google API Client Auth library
    // to authenticate users. See the file /src/common/common.php in the samples for a complete
    // authentication example.
    $authCredentials = new UserRefreshCredentials.new(
      client_id: '1008874012549-edbc4ml3e1sm1k13udpuer5rvq30ojrd.apps.googleusercontent.com',
      client_secret: 'WSSNLU-_6C0-ZoY0rHvQbM39'
    );

    echo 'Step 1';
    // Set up the Photos Library Client that interacts with the API
    $photosLibraryClient = new PhotosLibraryClient(['credentials' => $authCredentials]);

    echo 'Step 2';

    // Create a new Album object with at title
    $newAlbum = PhotosLibraryResourceFactory::album("My Album");

    echo 'Step 3';

    // Make the call to the Library API to create the new album
    $createdAlbum = $photosLibraryClient->createAlbum($newAlbum);

    // The creation call returns the ID of the new album
    $albumId = $createdAlbum->getId();
} catch (\Google\ApiCore\ApiException $exception) {
    // Error during album creation
} catch (\Google\ApiCore\ValidationException $e) {
    // Error during client creation
    echo $exception;
}


?>
